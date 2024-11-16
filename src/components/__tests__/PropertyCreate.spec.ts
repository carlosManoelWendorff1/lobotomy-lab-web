import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import i18n from '@/plugins/i18n'
import laboratoryCreate from '@/views/laboratories/laboratoryCreate.vue'

describe('laboratoryCreate', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(laboratoryCreate, {
      global: {
        plugins: [PrimeVue, i18n]
      }
    })
  })

  it('renders properly', async () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the page title with the correct text', async () => {
    const title = await wrapper.find('[data-testid="title"]')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Advertise your laboratory')
  })

  it('renders the page subtitle with the correct text', async () => {
    const subtitle = await wrapper.find('[data-testid="subtitle"]')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toBe('Fill in the details of the laboratory you want to advertise')
  })
})
