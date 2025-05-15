import type { ProductImagesSliderProps } from "../vite-env"

export default function ProductImageSlider ({ images }: { images: ProductImagesSliderProps["images"] } ) {
    return (
        <div className="product-image-slider">
            {images?.map((image) => (
                <img key={image.id} src={image.src} alt={image.alt} />
            ))}
        </div>
    )
}