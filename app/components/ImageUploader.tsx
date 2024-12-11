'use client'

import { useState, useRef } from 'react'
import styles from './ImageUploader.module.css'

export default function ImageUploader() {
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Upload image and process
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/process-image', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) throw new Error('图片处理失败')
      
      const blob = await response.blob()
      setProcessedImageUrl(URL.createObjectURL(blob))
    } catch (error) {
      console.error('Error:', error)
      alert('图片处理失败')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.imagePreview}>
      {processedImageUrl && 
        (<img src={processedImageUrl} alt="Processed" />
      )}
    </div>
    <div className={styles.uploadButton} onClick={() => fileInputRef.current?.click()}>
      <div className={styles.plusIcon}>+</div>
    </div>
    
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      ref={fileInputRef}
      style={{ display: 'none' }} 
      className={styles.hiddenInput}
    />
        
    </div>
  )
} 