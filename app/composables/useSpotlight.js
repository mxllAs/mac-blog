// app/composables/useSpotlight.js
export const useSpotlight = () => {
    const isOpen = useState('spotlight-open', () => false);

    const toggle = () => {
        isOpen.value = !isOpen.value;
    };

    const open = () => {
        isOpen.value = true;
    };

    const close = () => {
        isOpen.value = false;
    };

    return {
        isOpen,
        toggle,
        open,
        close
    };
};