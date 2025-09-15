import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const EditableText = ({ 
    value, 
    onChange, 
    isEditMode, 
    className = "", 
    placeholder = "Double-tap to edit",
    multiline = false,
    maxLength = null
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const [tapCount, setTapCount] = useState(0);
    const inputRef = useRef(null);
    const tapTimeoutRef = useRef(null);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            if (!multiline) {
                inputRef.current.select();
            }
        }
    }, [isEditing, multiline]);

    const handleClick = () => {
        if (!isEditMode) return;
        
        setTapCount(prev => prev + 1);
        
        // Clear existing timeout
        if (tapTimeoutRef.current) {
            clearTimeout(tapTimeoutRef.current);
        }
        
        // Set new timeout
        tapTimeoutRef.current = setTimeout(() => {
            if (tapCount + 1 >= 2) {
                setIsEditing(true);
            }
            setTapCount(0);
        }, 300); // 300ms window for double tap
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (tapTimeoutRef.current) {
                clearTimeout(tapTimeoutRef.current);
            }
        };
    }, []);

    const handleSave = () => {
        onChange(tempValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempValue(value);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !multiline) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const handleBlur = () => {
        handleSave();
    };

    if (isEditing) {
        const InputComponent = multiline ? 'textarea' : 'input';
        return (
            <InputComponent
                ref={inputRef}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className={`${className} bg-white border-2 border-blue-500 rounded px-2 py-1 outline-none resize-none`}
                placeholder={placeholder}
                maxLength={maxLength}
                rows={multiline ? 3 : undefined}
            />
        );
    }

    return (
        <motion.div
            onClick={handleClick}
            className={`${className} ${isEditMode ? 'cursor-pointer hover:bg-blue-50 rounded px-2 py-1 transition-colors duration-200' : ''}`}
            whileHover={isEditMode ? { backgroundColor: "rgba(59, 130, 246, 0.05)" } : {}}
            title={isEditMode ? "Double-tap to edit" : ""}
        >
            {value || placeholder}
        </motion.div>
    );
};

export default EditableText;
