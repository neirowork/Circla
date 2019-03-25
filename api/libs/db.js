import mysql from 'mysql'
import circlaConfig from '../../circla.config'

export const getPool = () => mysql.createPool(circlaConfig.mysql)
