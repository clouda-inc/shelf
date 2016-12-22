import Img from 'vtex.render/Img'
import Link from 'vtex.render/Link'
import React, { Component, PropTypes } from 'react'

import Price from './Price'

export const SHELF_PRODUCT_IMG_WIDTH = 291

const EMPTY_ARRAY = []

class ShelfProduct extends Component {
  handleDetails = (ev) => {
    ev.preventDefault()
    history.pushState(null, `/${this.props.slug}/p`)
  }

  render () {
    let defaultSkuIndex = 0
    let lowestOffer
    const skus = this.props.skus || EMPTY_ARRAY
    skus.forEach((sku, skuIndex) => {
      let isLowest
      const offers = sku.offers || EMPTY_ARRAY
      offers.forEach(offer => {
        if (offer.price === 0) return
        else if (!lowestOffer || (lowestOffer && offer.price < lowestOffer.price)) {
          lowestOffer = offer
          defaultSkuIndex = skuIndex
          isLowest = true
        }
      })
      if (isLowest) defaultSkuIndex = skuIndex
    })
    const sku = skus[defaultSkuIndex]
    const name = this.props.name
    const imageUrl = sku.images.length > 0
      ? sku.images[0].src : '//placehold.it/200x235'
    const price = lowestOffer ? lowestOffer.price : 0
    const listPrice = lowestOffer ? lowestOffer.listPrice : 0

    return (
      <div>
        <Link
          className={this.props.textStyle || 'link db mh1 mh2-ns f6 f5-ns br2 br--bottom ba bg-white b--black-10 relative cf overflow-hidden'}
          title={name}
          to={`/${this.props.slug}/p`}
          >
          <Img
            height={this.props.imgHeight || SHELF_PRODUCT_IMG_WIDTH}
            src={imageUrl}
            alt={name}
            width={this.props.imgWidth || SHELF_PRODUCT_IMG_WIDTH}
            className="bb b--black-05"
            />
          <div className={this.props.nameStyle || 'f6 f4-ns nowrap truncate lh-title mh1 mh2-ns mv2 black-60'}>
            {name}
          </div>
          <div className="cf tr mh1 mh2-ns pb3">
            {
              listPrice !== price ? (
                <div className="pb3">
                  <div className={this.props.listPriceStyle || 'fl f6 mt2 black-40'}>
                    <span>De: </span>
                    <span className="strike"><Price value={listPrice} /></span>
                  </div>
                  <div className={this.props.priceStyle || 'fr dib pv1 ph2 ba br2 b--washed-primary tc mt1 light-primary'}>
                    <span className="clip">Por: </span>
                    <Price value={price} />
                  </div>
                </div>
              ) : (
                <div className={this.props.priceStyle || 'fr dib pv1 ph2 ba br2 b--washed-primary tc mt1 light-primary'}>
                    <Price value={price} />
                  </div>
                )
            }
          </div>
        </Link>
      </div>
    )
  }
}

ShelfProduct.propTypes = {
  buttonStyle: PropTypes.string,
  buttonText: PropTypes.string,
  imgBackgroundColor: PropTypes.string,
  imgHeight: PropTypes.number,
  imgWidth: PropTypes.number,
  listPriceStyle: PropTypes.string,
  name: PropTypes.string,
  nameStyle: PropTypes.string,
  priceStyle: PropTypes.string,
  skus: PropTypes.array,
  slug: PropTypes.string,
  textStyle: PropTypes.string,
}

export default ShelfProduct
