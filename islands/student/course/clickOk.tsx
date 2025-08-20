type ClickOkProps = { isOk: boolean };
export default function ClickOk({ isOk }: ClickOkProps) {
  return (
    <div class="relative flex flex-col items-center">
      {isOk && (
        <div class="absolute -top-40 flex flex-col items-center animate-fadeInOut">
          {/* Muñeco caricatura */}
          <div class="w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center border-4 border-black relative">
            {/* Ojos */}
            <div class="absolute top-6 left-5 w-3 h-3 bg-black rounded-full">
            </div>
            <div class="absolute top-6 right-5 w-3 h-3 bg-black rounded-full">
            </div>
            {/* Boca sonriente */}
            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-4 border-b-4 border-black rounded-b-full">
            </div>
          </div>

          {/* Globo de diálogo */}
          <div class="relative mt-3">
            <div class="bg-white border-2 border-black px-4 py-2 rounded-xl shadow-lg">
              <span class="text-lg font-bold text-green-600">Yeii!!</span>
            </div>
            {/* Flechita del globo */}
            <div class="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 
                        border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black">
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
