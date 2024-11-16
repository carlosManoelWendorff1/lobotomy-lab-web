import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import router from '@/router'
import laboratoryCard from '@/components/laboratories/laboratoryCard.vue'
import { laboratory as mocklaboratory } from '@/data/laboratories.json'

describe('laboratoryCard', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = mount(laboratoryCard, {
      global: {
        plugins: [PrimeVue, router]
      },
      props: {
        laboratory: mocklaboratory,
        showExtendedInfo: false
      },
      mocks: {
        $n: (value: number) => value
      }
    })
  })

  it("renders the laboratory's data successfully", async () => {
    const wrapperHtml = wrapper.html()
    expect(wrapperHtml).toContain(mocklaboratory.title)
    expect(wrapperHtml).toContain(mocklaboratory.description)
    expect(wrapperHtml).toContain(mocklaboratory.price)
  })

  it('redirects to the laboratory details page when clicked on view button', async () => {
    const push = vi.spyOn(router, 'push')
    await wrapper.find('[data-testid="view-button"]').trigger('click')
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({
      name: 'laboratory-details',
      params: { id: mocklaboratory.id }
    })
  })
})
