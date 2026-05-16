// app.jsx — router + main App component

function useHashRoute() {
  // Initial route: prefer ?route= (set by entry pages like blog.html), then hash, then "/"
  const [route, setRoute] = React.useState(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("route");
    if (r) return r;
    const h = window.location.hash.replace(/^#/, "");
    return h || "/";
  });
  React.useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = React.useCallback((path) => {
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return [route, navigate];
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#5b4cff",
  "theme": "paper",
  "typeScale": 17,
  "displayFont": "Instrument Serif",
  "showMark": true
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = ["#5b4cff", "#1f6feb", "#c19a4b", "#1f8a5b", "#d04a3c"];
const ACCENT_INK = {
  "#5b4cff": "#2d1c8f",
  "#1f6feb": "#0b3a8a",
  "#c19a4b": "#7a5e1e",
  "#1f8a5b": "#0e5237",
  "#d04a3c": "#7a241a",
};

function App() {
  const [route, navigate] = useHashRoute();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply tweaks
  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--accent-ink", ACCENT_INK[t.accent] || t.accent);
    document.documentElement.style.setProperty("--f-display", `"${t.displayFont}", "Newsreader", Georgia, serif`);
    document.body.style.fontSize = t.typeScale + "px";
    document.documentElement.setAttribute("data-theme", t.theme === "dusk" ? "dusk" : "paper");
  }, [t]);

  // route resolution
  const renderRoute = () => {
    if (route === "/" || route === "") return <Home navigate={navigate} />;
    if (route === "/blog") return <BlogIndex navigate={navigate} />;
    if (route.startsWith("/blog/")) return <Article slug={route.split("/")[2]} navigate={navigate} />;
    if (route === "/lab") return <LabIndex navigate={navigate} />;
    if (route.startsWith("/lab/")) return <ProjectDetail slug={route.split("/")[2]} navigate={navigate} />;
    if (route === "/research") return <Research navigate={navigate} />;
    if (route === "/about") return <About navigate={navigate} />;
    return <Home navigate={navigate} />;
  };

  return (
    <div className="page">
      <Header route={route} navigate={navigate} />
      <div key={route}>{renderRoute()}</div>
      <Footer navigate={navigate} />

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio label="Mode" value={t.theme} options={["paper", "dusk"]}
                    onChange={(v) => setTweak("theme", v)} />
        <TweakColor label="Accent" value={t.accent} options={ACCENT_OPTIONS}
                    onChange={(v) => setTweak("accent", v)} />

        <TweakSection label="Typography" />
        <TweakSelect label="Display font" value={t.displayFont}
                     options={["Instrument Serif", "Newsreader", "Fraunces", "EB Garamond", "Playfair Display"]}
                     onChange={(v) => setTweak("displayFont", v)} />
        <TweakSlider label="Body size" value={t.typeScale} min={14} max={20} step={1} unit="px"
                     onChange={(v) => setTweak("typeScale", v)} />

        <TweakSection label="Brand" />
        <TweakToggle label="Show orbit mark" value={t.showMark}
                     onChange={(v) => setTweak("showMark", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
