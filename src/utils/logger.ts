import { createLogger, format, transports } from 'winston'
import { addColors } from 'winston/lib/winston/config'
const { combine, timestamp, label, prettyPrint, printf } = format

export class APILogger{
    public static myFormat = printf(info =>{
        return `[${info.timestamp}] [${info.level}] => ${info.message}`
    })
    public static levels = {
        levels: {
            error: 0,
            warn: 1,
            info: 2,
            http: 3,
            verbose: 4,
            debug: 5,
            silly: 6
        },
        colors: {
            error: 'red',
            warn: 'yellow',
            info: 'green',
            http: 'magenta',
            verbose: 'cyan',
            debug: 'white',
            silly: 'grey'
        }
    }
    
    public static logger = createLogger({
        // colorize: true,
        format: combine(
            label({label:'api errors'}),

            format.colorize(),
            format.simple(),
            timestamp(),
            APILogger.myFormat

        ),
        level: 'info',
        transports:[
            new transports.File({filename:'aggregated.log'}),
            new transports.Console(),
        ],

    })

}