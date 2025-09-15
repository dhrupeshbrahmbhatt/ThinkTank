// services/linkedinScraper.js - LinkedIn Public Profile Scraper
import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Scrape LinkedIn public profile data
 * @param {string} url - LinkedIn profile URL
 * @returns {Promise<Object>} - Scraped profile data
 */
export const scrapeLinkedInProfile = async (url) => {
  console.log('Starting scrape for:', url);
  
  try {
    // Fetch like a real Chrome browser (headers = your "disguise")
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      timeout: 15000,
      maxRedirects: 5
    });

    // Load HTML into Cheerio
    const $ = cheerio.load(response.data);
    
    // Initialize profile structure according to portfolio schema
    const profile = {
      id: 'Not Available',
      firstName: 'Not Available',
      lastName: 'Not Available',
      headline: 'Not Available',
      profilePicture: 'Not Available',
      location: 'Not Available',
      positions: [],
      education: [],
      skills: [],
      accomplishments: {
        projects: [],
        certifications: []
      }
    };

    // Extract ID from URL (vanity name)
    const vanityMatch = url.match(/\/in\/([a-zA-Z0-9\-]+)\/?$/);
    if (vanityMatch) {
      profile.id = vanityMatch[1];
    }

    // Step 1: Parse JSON-LD (most reliable structured data)
    await parseJsonLD($, profile);
    
    // Step 2: HTML fallback parsing for missing data
    await parseHTMLFallbacks($, profile);
    
    // Step 3: Clean and validate data
    cleanProfileData(profile);
    
    console.log('Scraped Data:', JSON.stringify(profile, null, 2));
    return profile;

  } catch (error) {
    console.error('Scraping error:', error.message);
    
    if (error.response?.status === 999 || error.response?.status === 403) {
      throw new Error('Blocked by LinkedIn anti-bot protection. Try using proxies or reducing request frequency.');
    }
    
    if (error.response?.status === 404) {
      throw new Error('LinkedIn profile not found or is private.');
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. LinkedIn servers may be slow.');
    }
    
    throw new Error(`Failed to scrape LinkedIn profile: ${error.message}`);
  }
};

/**
 * Parse JSON-LD structured data from LinkedIn page
 * @param {Object} $ - Cheerio instance
 * @param {Object} profile - Profile object to populate
 */
const parseJsonLD = async ($, profile) => {
  const jsonLdScript = $('script[type="application/ld+json"]').first();
  
  if (jsonLdScript.length > 0) {
    try {
      const jsonLdData = JSON.parse(jsonLdScript.html());
      
      // Handle both single object and @graph array formats
      let personData = null;
      
      if (jsonLdData['@graph']) {
        personData = jsonLdData['@graph'].find(item => item['@type'] === 'Person');
      } else if (jsonLdData['@type'] === 'Person') {
        personData = jsonLdData;
      }
      
      if (personData) {
        // Extract name
        if (personData.name) {
          const fullName = personData.name.trim();
          const nameParts = fullName.split(' ');
          profile.firstName = nameParts[0] || 'Not Available';
          profile.lastName = nameParts.slice(1).join(' ') || 'Not Available';
        }

        // Extract headline/description
        if (personData.description || personData.jobTitle) {
          profile.headline = (personData.description || personData.jobTitle).substring(0, 220);
        }

        // Extract location
        if (personData.address) {
          const address = personData.address;
          if (typeof address === 'string') {
            profile.location = address.substring(0, 100);
          } else if (address['@type'] === 'PostalAddress') {
            const locationParts = [
              address.addressLocality,
              address.addressRegion,
              address.addressCountry
            ].filter(part => part && part.trim());
            if (locationParts.length > 0) {
              profile.location = locationParts.join(', ').substring(0, 100);
            }
          }
        }

        // Extract profile picture
        if (personData.image) {
          profile.profilePicture = Array.isArray(personData.image) ? personData.image[0] : personData.image;
        }

        // Extract work experience (limit to top 3)
        if (personData.worksFor) {
          const worksFor = Array.isArray(personData.worksFor) ? personData.worksFor : [personData.worksFor];
          worksFor.slice(0, 3).forEach(role => {
            const position = {
              title: role.jobTitle || role.name || 'Not Available',
              company: role.name || role.worksFor?.name || 'Not Available'
            };
            
            // Add dates if available
            if (role.startDate || role.endDate) {
              position.dates = formatDates(role.startDate, role.endDate);
            }
            
            // Add description if available (limit to 100 chars)
            if (role.description) {
              position.description = role.description.substring(0, 100);
            }
            
            profile.positions.push(position);
          });
        }

        // Extract education (limit to top 2)
        if (personData.alumniOf) {
          const alumniOf = Array.isArray(personData.alumniOf) ? personData.alumniOf : [personData.alumniOf];
          alumniOf.slice(0, 2).forEach(school => {
            const education = {
              school: school.name || 'Not Available'
            };
            
            // Add degree if available
            if (school.description || school.courseCode) {
              education.degree = school.description || school.courseCode;
            }
            
            // Add field of study if available
            if (school.fieldOfStudy) {
              education.fieldOfStudy = school.fieldOfStudy;
            }
            
            // Add dates if available
            if (school.startDate || school.endDate) {
              education.dates = formatDates(school.startDate, school.endDate);
            }
            
            profile.education.push(education);
          });
        }

        // Extract skills from knowsAbout (limit to top 5)
        if (personData.knowsAbout) {
          const knowsAbout = Array.isArray(personData.knowsAbout) ? personData.knowsAbout : [personData.knowsAbout];
          profile.skills = knowsAbout.slice(0, 5).map(skill => 
            typeof skill === 'string' ? skill : skill.name || 'Not Available'
          ).filter(skill => skill !== 'Not Available');
        }
      }
    } catch (jsonError) {
      console.warn('JSON-LD parsing error:', jsonError.message);
    }
  }
};

/**
 * Parse HTML elements as fallback for missing JSON-LD data
 * @param {Object} $ - Cheerio instance
 * @param {Object} profile - Profile object to populate
 */
const parseHTMLFallbacks = async ($, profile) => {
  // Fallback for name
  if (profile.firstName === 'Not Available' || profile.lastName === 'Not Available') {
    const nameSelectors = [
      '.text-heading-xlarge',
      '.top-card-layout__title',
      '.pv-text-details__left-panel h1',
      '.ph5 .pb2 h1'
    ];
    
    for (const selector of nameSelectors) {
      const nameEl = $(selector).first();
      if (nameEl.length && nameEl.text().trim()) {
        const fullName = nameEl.text().trim();
        const nameParts = fullName.split(' ');
        profile.firstName = nameParts[0] || 'Not Available';
        profile.lastName = nameParts.slice(1).join(' ') || 'Not Available';
        break;
      }
    }
  }

  // Fallback for headline
  if (profile.headline === 'Not Available') {
    const headlineSelectors = [
      '.text-body-medium.break-words',
      '.top-card-layout__headline',
      '.pv-text-details__left-panel .text-body-medium',
      '.ph5 .pb2 .text-body-medium'
    ];
    
    for (const selector of headlineSelectors) {
      const headlineEl = $(selector).first();
      if (headlineEl.length && headlineEl.text().trim()) {
        profile.headline = headlineEl.text().trim().substring(0, 220);
        break;
      }
    }
  }

  // Fallback for location
  if (profile.location === 'Not Available') {
    const locationSelectors = [
      '.text-body-small.inline.t-black--light.break-words',
      '.top-card-layout__first-subline',
      '.pv-text-details__left-panel .pb2 .text-body-small'
    ];
    
    for (const selector of locationSelectors) {
      const locationEl = $(selector).first();
      if (locationEl.length && locationEl.text().trim()) {
        profile.location = locationEl.text().trim().substring(0, 100);
        break;
      }
    }
  }

  // Remove connections field as it's not in the new schema

  // Fallback for profile picture
  if (profile.profilePicture === 'Not Available') {
    const imgSelectors = [
      '.pv-top-card__photo img',
      '.top-card-layout__entity-image img',
      '.presence-entity__image img'
    ];
    
    for (const selector of imgSelectors) {
      const imgEl = $(selector).first();
      if (imgEl.length && imgEl.attr('src')) {
        profile.profilePicture = imgEl.attr('src');
        break;
      }
    }
  }

  // Fallback for positions (if empty from JSON-LD, limit to 3)
  if (profile.positions.length === 0) {
    $('.experience-item, .pv-entity__position-group-pager li').slice(0, 3).each((i, el) => {
      const $el = $(el);
      const title = $el.find('.t-16.t-black.t-bold, .pv-entity__summary-info h3').first().text().trim();
      const company = $el.find('.pv-entity__secondary-title, .t-14.t-black--light').first().text().trim();
      const dates = $el.find('.pv-entity__date-range, .t-12.t-black--light').first().text().trim();
      const description = $el.find('.pv-entity__description, .t-14').first().text().trim();
      
      if (title) {
        const position = {
          title: title || 'Not Available',
          company: company || 'Not Available'
        };
        
        if (dates) {
          position.dates = dates;
        }
        
        if (description) {
          position.description = description.substring(0, 100);
        }
        
        profile.positions.push(position);
      }
    });
  }

  // Fallback for education (if empty from JSON-LD, limit to 2)
  if (profile.education.length === 0) {
    $('.education-item, .pv-education-entity').slice(0, 2).each((i, el) => {
      const $el = $(el);
      const school = $el.find('.pv-entity__school-name, .t-16.t-black.t-bold').first().text().trim();
      const degree = $el.find('.pv-entity__degree-name, .t-14.t-black--light').first().text().trim();
      const fieldOfStudy = $el.find('.pv-entity__fos, .t-14').first().text().trim();
      const dates = $el.find('.pv-entity__dates, .t-12.t-black--light').first().text().trim();
      
      if (school) {
        const education = {
          school: school || 'Not Available'
        };
        
        if (degree) {
          education.degree = degree;
        }
        
        if (fieldOfStudy) {
          education.fieldOfStudy = fieldOfStudy;
        }
        
        if (dates) {
          education.dates = dates;
        }
        
        profile.education.push(education);
      }
    });
  }

  // Extract projects and certifications for accomplishments
  // Projects from featured section
  $('.pv-accomplishments-block .pv-accomplishments-block__content .pv-accomplishments-block__summary-list li').slice(0, 2).each((i, el) => {
    const $el = $(el);
    const name = $el.find('.pv-accomplishment-entity__title').text().trim();
    const description = $el.find('.pv-accomplishment-entity__description').text().trim();
    
    if (name) {
      profile.accomplishments.projects.push({
        name: name,
        description: description ? description.substring(0, 150) : undefined
      });
    }
  });
  
  // Certifications
  $('.pv-profile-section__section-info .pv-accomplishments-block .pv-accomplishments-block__content .pv-accomplishments-block__summary-list li').slice(0, 2).each((i, el) => {
    const $el = $(el);
    const name = $el.find('.pv-accomplishment-entity__title').text().trim();
    const issuer = $el.find('.pv-accomplishment-entity__issuer').text().trim();
    const date = $el.find('.pv-accomplishment-entity__date').text().trim();
    
    if (name) {
      const cert = { name: name };
      if (issuer) cert.issuer = issuer;
      if (date) cert.date = date;
      profile.accomplishments.certifications.push(cert);
    }
  });
};

/**
 * Format date range for positions and education
 * @param {string} startDate - Start date
 * @param {string} endDate - End date
 * @returns {string} - Formatted date range
 */
const formatDates = (startDate, endDate) => {
  if (!startDate && !endDate) return undefined;
  
  const start = startDate ? new Date(startDate).getFullYear() : '';
  const end = endDate ? new Date(endDate).getFullYear() : 'Present';
  
  return `${start} - ${end}`.replace(' - ', ' - ').trim();
};

/**
 * Clean and validate profile data according to portfolio schema
 * @param {Object} profile - Profile object to clean
 */
const cleanProfileData = (profile) => {
  // Remove empty positions
  profile.positions = profile.positions.filter(pos => 
    pos.title !== 'Not Available' && pos.company !== 'Not Available'
  );
  
  // Remove empty education entries
  profile.education = profile.education.filter(edu => 
    edu.school !== 'Not Available'
  );
  
  // Remove empty skills
  profile.skills = profile.skills.filter(skill => 
    skill && skill !== 'Not Available' && skill.trim().length > 0
  );
  
  // Ensure unique skills (max 5)
  profile.skills = [...new Set(profile.skills)].slice(0, 5);
  
  // Clean accomplishments
  profile.accomplishments.projects = profile.accomplishments.projects.filter(proj => 
    proj.name && proj.name !== 'Not Available'
  ).slice(0, 2);
  
  profile.accomplishments.certifications = profile.accomplishments.certifications.filter(cert => 
    cert.name && cert.name !== 'Not Available'
  ).slice(0, 2);
  
  // Ensure required fields have defaults
  if (!profile.firstName || profile.firstName === 'Not Available') {
    profile.firstName = 'Not Available';
  }
  
  if (!profile.lastName || profile.lastName === 'Not Available') {
    profile.lastName = 'Not Available';
  }
  
  if (!profile.headline || profile.headline === 'Not Available') {
    profile.headline = 'Not Available';
  }
  
  if (!profile.id || profile.id === 'Not Available') {
    profile.id = 'Not Available';
  }
};

/**
 * Validate LinkedIn profile URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid LinkedIn profile URL
 */
export const isValidLinkedInUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  const linkedinUrlPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-]+\/?(\?.*)?$/i;
  return linkedinUrlPattern.test(url);
};

/**
 * Extract vanity name from LinkedIn URL
 * @param {string} url - LinkedIn profile URL
 * @returns {string} - Vanity name or empty string
 */
export const extractVanityName = (url) => {
  if (!url || typeof url !== 'string') return '';
  
  const match = url.match(/\/in\/([a-zA-Z0-9\-]+)\/?$/);
  return match ? match[1] : '';
};

/**
 * Add delay between requests to avoid rate limiting
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} - Promise that resolves after delay
 */
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
