import { Palette_Mosaic, Lusitana, Poppins } from 'next/font/google';

export const paletteMosaic = Palette_Mosaic({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-palette-mosaic',
});

export const lusitana = Lusitana({
    weight: '700',
    subsets: ['latin'],
    variable: '--font-lusitana',
});

export const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-poppins',
});