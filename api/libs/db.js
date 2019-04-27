import db from 'mysql'
import circlaConfig from '../../circla.config'

export default db.createPool(circlaConfig.mysql)
