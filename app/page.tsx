import UploadForm from '../components/upload-form'

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Detector de Posições de Jiu Jitsu</h1>
      <p className="mb-4 text-gray-600 text-center max-w-md">
        Faça upload de uma imagem para análise. A API retornará a posição detectada e a imagem com keypoints.
      </p>
      <UploadForm />
    </main>
  )
}