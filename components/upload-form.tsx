'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import Image from 'next/image'
import { positionFormat } from '@/utils/format'

type AnalysisResult = {
  position_detected: string
  image_with_keypoints: string
  image_format: string
}

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
      setAnalysisResult(null)
      setError(null)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedFile) return

    setLoading(true)
    setError(null)
    setAnalysisResult(null)

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/analyze/', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error(`Erro da API: ${res.status}`)
      }

      const data: AnalysisResult = await res.json()
      setAnalysisResult(data)
    } catch (err: any) {
      setError(`Falha na análise: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white p-6 rounded shadow">
      <form onSubmit={handleSubmit}>
        <label 
          htmlFor="file" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Selecione ou capture uma imagem
        </label>
        <input
          type="file"
          id="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer focus:outline-none"
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded disabled:opacity-50"
          disabled={!selectedFile || loading}
        >
          {loading ? 'Analisando...' : 'Enviar para análise'}
        </button>
      </form>

      {error && (
        <div className="w-full mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}

      {analysisResult && (
        <div className="w-full mt-6 bg-gray-50 p-4 rounded border">
          <h2 className="text-xl font-bold mb-4">Resultado da Análise</h2>
          <p className="mb-2">
            <strong>Posição detectada:</strong> {positionFormat(analysisResult.position_detected)}
          </p>
          {analysisResult.image_with_keypoints && (
            <div className="mt-4">
              <p className="mb-2 font-medium">Imagem com keypoints:</p>
              <div className="relative w-full h-auto overflow-hidden border rounded">
                <Image
                  src={`data:image/${analysisResult.image_format || 'jpeg'};base64,${analysisResult.image_with_keypoints}`}
                  alt="Imagem Analisada"
                  width={500}
                  height={500}
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
