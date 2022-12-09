import Image from '@tiptap/extension-image';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        alignedImage: {
            /**
             * Add an image
             */
            setAlignedImage: (options: { src: string, alt?: string, title?: string, align?: 'left' | 'right' | 'center' | 'none' }) => ReturnType,
        }
    }
}

export function getDefaultAlignmentClass(align?: 'left' | 'right' | 'center' | 'none' | null) {
    if (!align) return null;
    switch (align) {
        case 'left': return 'is-align-left';
        case 'right': return 'is-align-right';
        case 'center': return 'is-align-center';
        default: return null;
    }
}
export type MapperFn = (align?: 'left' | 'right' | 'center' | 'none' | null) => string | null;

let mapperFn: MapperFn = getDefaultAlignmentClass;

export function setAlignmentClassMapper(mapper: MapperFn) {
    mapperFn = mapper;
}

export function getAlignmentClass(align?: 'left' | 'right' | 'center' | 'none' | null) {
    return mapperFn(align);
}

const AlignedImage = Image.extend({
    name: 'alignedImage',
    addOptions() {
        return {
            ...this.parent?.(),
            align: ['center', 'left', 'right', 'none']
        }
    },
    addAttributes() {
        return {
            ...Image.config.addAttributes?.call(this),
            class: {
                default: null,
                rendered: true
            }
        }
    },
    addCommands() {
        return {
            setAlignedImage: options => ({ commands }) => {
                const { align, ...attrs } = options;

                return commands.insertContent({
                    type: this.name,
                    attrs: { class: getAlignmentClass(align), ...options }
                })
            },
        }
    }
});

export { AlignedImage };
