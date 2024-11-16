import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import router from '@/router'
import PropertyCard from '@/components/properties/PropertyCard.vue'
import { property as mockProperty } from '@/data/properties.json'

describe('PropertyCard', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = mount(PropertyCard, {
      global: {
        plugins: [PrimeVue, router]
      },
      props: {
        property: mockProperty,
        showExtendedInfo: false
      },
      mocks: {
        $n: (value: number) => value
      }
    })
  })

  it("renders the property's data successfully", async () => {
    const wrapperHtml = wrapper.html()
    expect(wrapperHtml).toContain(mockProperty.title)
    expect(wrapperHtml).toContain(mockProperty.description)
    expect(wrapperHtml).toContain(mockProperty.price)
  })

  it('redirects to the property details page when clicked on view button', async () => {
    const push = vi.spyOn(router, 'push')
    await wrapper.find('[data-testid="view-button"]').trigger('click')
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({
      name: 'property-details',
      params: { id: mockProperty.id }
    })
  })
})
