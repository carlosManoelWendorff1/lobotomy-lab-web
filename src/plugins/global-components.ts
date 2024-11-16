import type { App } from 'vue'

import BaseButton from '@/components/wrappers/form/BaseButton.vue'
import BaseInputText from '@/components/wrappers/form/BaseInputText.vue'
import BaseInputNumber from '@/components/wrappers/form/BaseInputNumber.vue'
import BaseInputIcon from '@/components/wrappers/form/BaseInputIcon.vue'
import BaseInputMask from '@/components/wrappers/form/BaseInputMask.vue'
import BaseInputPassword from '@/components/wrappers/form/BaseInputPassword.vue'
import BaseCheckbox from '@/components/wrappers/form/BaseCheckbox.vue'
import BaseCheckboxGroup from '@/components/wrappers/form/BaseCheckboxGroup.vue'
import BaseDropdown from '@/components/wrappers/form/BaseDropdown.vue'
import BaseSkeleton from '@/components/wrappers/misc/BaseSkeleton.vue'
import BaseCard from '@/components/wrappers/misc/BaseCard.vue'
import BaseMultiSelect from '@/components/wrappers/form/BaseMultiSelect.vue'

const globalComponents = {
  install(app: App<Element>) {
    app.component('BaseButton', BaseButton)
    app.component('BaseInputText', BaseInputText)
    app.component('BaseInputNumber', BaseInputNumber)
    app.component('BaseInputIcon', BaseInputIcon)
    app.component('BaseInputMask', BaseInputMask)
    app.component('BaseInputPassword', BaseInputPassword)
    app.component('BaseCheckbox', BaseCheckbox)
    app.component('BaseCheckboxGroup', BaseCheckboxGroup)
    app.component('BaseDropdown', BaseDropdown)
    app.component('BaseSkeleton', BaseSkeleton)
    app.component('BaseCard', BaseCard)
    app.component('BaseMultiSelect', BaseMultiSelect)
  }
}

export default globalComponents
