/**
 * SAFA (صفا) — Semantic Design Tokens
 * Establishes abstract UI roles decoupled from raw color values.
 * Consumed by components for Light and Dark modes.
 */

export interface SemanticTheme {
  background: {
    canvas: string;
    surface: string;
    surfaceRaised: string;
    surfaceSubtle: string;
    surfaceInset: string;
    surfaceHighlight: string;
    overlay: string;
    dock: string;
  };
  content: {
    primary: string;
    secondary: string;
    tertiary: string;
    muted: string;
    subtle: string;
    inverse: string;
    accent: string;
  };
  border: {
    subtle: string;
    default: string;
    strong: string;
    focus: string;
    selected: string;
    transparent: string;
  };
  accent: {
    primary: string;
    primarySubtle: string;
    primaryHover: string;
    primaryActive: string;
    primaryContent: string;

    secondary: string;
    secondarySubtle: string;
    secondaryHover: string;
    secondaryActive: string;
    secondaryContent: string;

    gold: string;
    goldSubtle: string;
    goldContent: string;

    turquoise: string;
    turquoiseSubtle: string;
    turquoiseContent: string;
  };
  status: {
    idea: { bg: string; text: string; border: string };
    planning: { bg: string; text: string; border: string };
    active: { bg: string; text: string; border: string };
    paused: { bg: string; text: string; border: string };
    completed: { bg: string; text: string; border: string };
    archived: { bg: string; text: string; border: string };
    draft: { bg: string; text: string; border: string };
    developing: { bg: string; text: string; border: string };
    final: { bg: string; text: string; border: string };
    danger: { bg: string; text: string; border: string };
  };
  shadow: {
    subtle: string;
    surface: string;
    raised: string;
    floating: string;
    overlay: string;
  };
}
