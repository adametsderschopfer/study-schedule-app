export function createFontFace(
  fontName: string,
  fileName: string,
  weight?: string | number,
  style?: string,
): string {
  return `
    @font-face {
      font-family: quote(${fontName});
      font-display: fallback;
      src: url(${fileName} + ".ttf") format("truetype");
      font-weight: ${weight || "normal"}; 
      font-style: ${style || "normal"}; 
    }
  `;
}

export const getRandomArbitrary = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};
