import { useRef, useState } from "react";
import type { Project } from "../types/project";
import { useI18n } from "../i18n/context";
export function ScreenshotGallery({
  images,
}: {
  images: NonNullable<Project["gallery"]>;
}) {
  const { tr } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  return (
    <>
      <div className="screenshot-gallery">
        {images.map((image, index) => (
          <figure key={image.src}>
            <button
              type="button"
              className="screenshot-button"
              aria-label={`${tr("Enlarge screenshot")}: ${tr(image.caption)}`}
              onClick={() => {
                setSelected(index);
                dialog.current?.showModal();
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}${image.src}`}
                alt={tr(image.alt)}
                width="1440"
                height="900"
                loading="lazy"
              />
              <span>{tr("View full size")} ↗</span>
            </button>
            <figcaption>{tr(image.caption)}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="screenshot-dialog"
        aria-label={tr("Product screenshot")}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <form method="dialog">
          <button className="button secondary" autoFocus>
            {tr("Close")} ×
          </button>
        </form>
        <img
          src={`${import.meta.env.BASE_URL}${images[selected].src}`}
          alt={tr(images[selected].alt)}
          width="1440"
          height="900"
        />
        <p>{tr(images[selected].caption)}</p>
      </dialog>
    </>
  );
}
