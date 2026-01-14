'use client'
import { useState, useRef } from 'react'
import { ImageIcon, Upload, X, Link as LinkIcon } from 'lucide-react'

export default function ImageUpload({ value, onChange, className = '' }) {
    const [isDragging, setIsDragging] = useState(false)
    const [mode, setMode] = useState('drop') // 'drop' or 'url'
    const [urlInput, setUrlInput] = useState(value || '')
    const fileInputRef = useRef(null)

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        
        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
            convertToBase64(file)
        }
    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file && file.type.startsWith('image/')) {
            convertToBase64(file)
        }
    }

    const convertToBase64 = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            onChange(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    const handleUrlSubmit = () => {
        if (urlInput.trim()) {
            onChange(urlInput.trim())
        }
    }

    const handleRemove = () => {
        onChange('')
        setUrlInput('')
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Mode Toggle */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => setMode('drop')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        mode === 'drop' 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    <Upload className="w-4 h-4" />
                    رفع صورة
                </button>
                <button
                    type="button"
                    onClick={() => setMode('url')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        mode === 'url' 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    <LinkIcon className="w-4 h-4" />
                    رابط URL
                </button>
            </div>

            {mode === 'drop' ? (
                /* Drag & Drop Zone */
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`drop-zone border-gray-600 bg-gray-800/50 p-8 text-center cursor-pointer ${
                        isDragging ? 'dragging' : 'hover:border-gray-500 hover:bg-gray-800'
                    }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    
                    {value ? (
                        <div className="relative inline-block">
                            <img 
                                src={value} 
                                alt="Preview" 
                                className="max-h-48 rounded-lg mx-auto"
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemove()
                                }}
                                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-gray-300 font-medium">اسحب الصورة هنا</p>
                                <p className="text-gray-500 text-sm">أو اضغط لاختيار صورة</p>
                            </div>
                            <p className="text-gray-600 text-xs">PNG, JPG, WEBP حتى 5MB</p>
                        </div>
                    )}
                </div>
            ) : (
                /* URL Input */
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="url"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                onBlur={handleUrlSubmit}
                                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                                placeholder="https://example.com/image.jpg"
                                className="w-full pr-10 input-dark"
                                dir="ltr"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleUrlSubmit}
                            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/80 transition-colors"
                        >
                            تطبيق
                        </button>
                    </div>
                    
                    {value && (
                        <div className="relative inline-block">
                            <img 
                                src={value} 
                                alt="Preview" 
                                className="max-h-48 rounded-lg"
                                onError={(e) => {
                                    e.target.src = ''
                                    e.target.alt = 'خطأ في تحميل الصورة'
                                }}
                            />
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
