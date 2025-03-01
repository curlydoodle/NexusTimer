import { Themes } from "@/interfaces/types/Themes";
import loadSettings from "@/lib/loadSettings";
import { useSettingsModalStore } from "@/store/SettingsModalStore";

interface Variation {
  bg: string;
  text: string;
  name: string;
  key: Themes;
}

export default function ThemeSelect() {
  const { settings, setSettings } = useSettingsModalStore();
  const variation: Variation[] = [
    {
      bg: "bg-neutral-100",
      text: "text-white",
      name: "Light",
      key: "light",
    },
    {
      bg: "bg-zinc-950",
      text: "text-white",
      name: "Dark",
      key: "dark",
    },
  ];

  const handleSelectTheme = (newThemeKey: string) => {
    const currentSettings = loadSettings();
    currentSettings.theme.background.color = newThemeKey;
    window.localStorage.setItem("settings", JSON.stringify(currentSettings));
    setSettings(currentSettings);
  };

  return (
    <div className="grid justify-around grid-cols-2 gap-10 ms-10 me-10">
      {variation.map((item) => (
        <div key={item.key}>
          <div
            onClick={() => handleSelectTheme(item.key)}
            className="flex flex-col items-center justify-center"
          >
            <div
              className={`cursor-pointer w-full h-40 rounded-md ${item.bg} ${
                item.key === settings.theme.background.color
                  ? "outline outline-blue-600"
                  : "border border-black"
              }`}
            ></div>
            <div className="mt-1 text-xs font-medium">{item.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
