"use client";

interface Props {
  selectedVoice: string;
  onChange: (voice: string) => void;
}

export default function VoiceSelector({ selectedVoice, onChange }: Props) {
  return (
    <div className="flex justify-center gap-3">
      {["male", "female"].map((voice) => (
        <button
          key={voice}
          onClick={() => onChange(voice)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedVoice === voice
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {voice.charAt(0).toUpperCase() + voice.slice(1)}
        </button>
      ))}
    </div>
  );
}