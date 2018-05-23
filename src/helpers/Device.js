import {EventEmitter} from 'events'
import _debounce from 'debounce'

class Device extends EventEmitter {
  constructor() {
    super(...arguments)

    this._device_size_meta_el = document.querySelector('meta[name="device-size"]')

    this._width = this._getWindowWidth()
    this._height = this._getWindowHeight()
    this._isMobile = this._testIsMobile()
    this._isIOS = this._testIsIOS()

    this._onResize = _debounce(this._onResize.bind(this), 300)

    window.addEventListener('resize', this._onResize)
    window.addEventListener('orientationchange', this._onResize)
  }
  _onResize() {
    const width = this._getWindowWidth()
    const height = this._getWindowHeight()
    const isMobile = this._testIsMobile()
    const isIOS = this._testIsIOS()
    let viewport_resized = false
    let device_changed = false

    if( width != this._width ){
      this._width = width
      viewport_resized = true
    }
    if( height != this._height ){
      this._height = height
      viewport_resized = true
    }
    if( isMobile != this._isMobile ){
      this._isMobile = isMobile
      device_changed = true
    }
    if( isIOS != this._isIOS ){
      this._isIOS = isIOS
      device_changed = true
    }

    if( viewport_resized ){
      this.emit('viewport_resized', this._width, this._height)
    }
    if( device_changed ){
      this.emit('device_changed', this._isMobile, this._isIOS)
    }
  }
  _getWindowWidth() {
    return window.innerWidth
  }
  _getWindowHeight() {
    return window.innerHeight
  }
  _testIsMobile() {
    return window.getComputedStyle(this._device_size_meta_el).getPropertyValue('font-family') == 'mobile'
  }
  _testIsIOS() {
    // http://stackoverflow.com/questions/9038625/detect-if-device-is-ios
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  }
  get width() {
    return this._width
  }
  get height() {
    return this._height
  }
  get isMobile() {
    return this._isMobile
  }
  get isIOS() {
    return this._isIOS
  }
}
export default new Device()