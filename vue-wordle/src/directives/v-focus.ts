
import type { Directive } from 'vue';
import type { Ref } from 'vue';
import { ref } from 'vue';
export const vFocus : Directive<HTMLElement, Ref<HTMLElement | null>[]> = {
  mounted: (el, binding) => {
    const refs = binding.value;

    if (Array.isArray(refs)) {
      for (const refEl of refs) {
        if (refEl?.value instanceof HTMLElement) {
          refEl.value.focus();
          break; // Фокус тільки перший доступний
        }
      }
    }
    
  }
};