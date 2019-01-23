const argv = require('minimist')(process.argv.slice(2))
const async = require('async')
const _ = require('lodash')

const { spawn } = require('child_process');
const airports = require('./airports.json')

const domain = _.get(argv, 'domain', 'media.admiralcloud.com')

let ips = []
async.series({
  collectIPs: (done) => {
    const ls = spawn('host', [domain]);
    const regex = /(\d{1,3}\.){3}(\d{1,3})/g
    ls.stdout.on('data', (data) => {
      ips = data.toString().match(regex)
    });
    
    ls.stderr.on('data', (data) => {
      return done({ message: 'collectIPs_failed', additionalInfo: data })
    });
    
    ls.on('close', done)
  },
  processIPs: (done) => {
    let ip = _.first(ips)
    const ls = spawn('dig', ['-x', ip, '+short']);
    const regex = /(\d{1,3}-){1,3}\d{1,3}\.(([a-z]{1,3})(\w{1,3}))\./i
    ls.stdout.on('data', (data) => {
      let locRegex = data.toString().match(regex)
      if (_.get(locRegex, '[3]')) {
        let location = _.find(airports, { iata: _.toUpper(_.get(locRegex, '[3]')) })
        console.log(_.repeat('-', 60))
        console.log('Domain:         %s', domain)
        console.log('Delivery IP:    %s', ip)
        console.log('Edge:           %s', _.get(locRegex, '[2]'))
        console.log('Location:       %s', _.get(location, 'name'))
        console.log('Country/Region: %s/%s', _.get(location, 'iso'), _.get(location, 'continent'))
        console.log(_.repeat('-', 60))
      }
      else {
        console.log('Domain is not delivered via AWS Cloudfront')
      }
    });
    
    ls.stderr.on('data', (data) => {
      return done({ message: 'processIPs_failed', additionalInfo: data })
    });
    
    ls.on('close', done)  
  }
}, (err) => {
  if (err) console.error(err)
  process.exit(0)
})