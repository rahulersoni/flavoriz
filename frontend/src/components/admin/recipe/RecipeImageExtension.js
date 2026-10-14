import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";

import RecipeImageNode from "./RecipeImageNode";

export const RecipeImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),

            width: {
                default: "100%",

                parseHTML: (element) =>
                    element.getAttribute("width") ||
                    element.style.width ||
                    "100%",

                renderHTML: (attributes) => ({
                    width: attributes.width,
                }),
            },

            align: {
                default: "center",

                parseHTML: (element) =>
                    element.getAttribute("data-align") ||
                    "center",

                renderHTML: (attributes) => ({
                    "data-align": attributes.align,
                }),
            },
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(RecipeImageNode);
    },
});