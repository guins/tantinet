let instance = null

export class logger {
  constructor()
  {
    if( instance ){
      return instance 
    }

    this._appName = ''
    this._debugMode = false

    instance = this
    
    return this
  }
  set appName(value)
  {
    this._appName = value
  }
  get appName()
  {
    return this._appName
  }
  set debugMode(value)
  {
    this._debugMode = value
  }
  get debugMode()
  {
    return this._debugMode
  }
  log()
  {
    if( this._debugMode ){
      console.log( ...[this._appName, ...arguments] )
    }
  }
}

instance = new logger()

export const log = instance.log.bind(instance)
export const loggerInstance = instance