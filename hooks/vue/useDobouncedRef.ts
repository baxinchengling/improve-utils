import { customRef } from "vue";

export function useDobouncedRef<T>(value: T, delay = 500) {
    let timeout: number | undefined;
    return customRef((track: () => void, trigger: () => void) => {
        return {
            get() {
                track();
                return value;
            },
            set(newValue: T) {
                clearTimeout(timeout as number);
                timeout = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, delay)
            }
        }

    })
}