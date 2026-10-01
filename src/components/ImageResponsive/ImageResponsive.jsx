import { useEffect, useRef } from "react";

function ImageResponsive() {
    const imageRef = useRef(null);

    useEffect(() => {
        const image = imageRef.current;

        const handleLoad = () => {
            console.log("========== IMAGE LOADED ==========");

            console.log(
                "Viewport:",
                window.innerWidth + "px"
            );

            console.log(
                "Selected image:",
                image.currentSrc
            );

            console.log(
                "Displayed width:",
                image.clientWidth + "px"
            );

            console.log(
                "Actual image width:",
                image.naturalWidth + "px"
            );

            console.log(
                "Device Pixel Ratio:",
                window.devicePixelRatio
            );
        };

        image.addEventListener("load", handleLoad);

        return () => {
            image.removeEventListener("load", handleLoad);
        };
    }, []);

    return (
        <div>
            <h1>Responsive Image</h1>

            <img
                ref={imageRef}
                src="/images/nature-800.jpg"

                srcSet="
                    /images/nature-400.jpg 400w,
                    /images/nature-800.jpg 800w,
                    /images/nature-1200.jpg 1200w,
                    /images/nature-1600.jpg 1600w
                "

                sizes="
                    (max-width: 600px) 100vw,
                    (max-width: 1000px) 80vw,
                    600px
                "

                alt="Nature"

                style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "auto",
                    display: "block"
                }}
            />
        </div>
    );
}

export default ImageResponsive;