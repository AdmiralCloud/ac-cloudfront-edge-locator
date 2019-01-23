# AC Cloudfront Edge Locator
This tool displays the Cloudfront edge location from which the given domain is delivered.

AWS does not provide a list of IPs mapping to their edge locations. However, our team at AdmiralCloud required a tool to check from which location content of our media asset management is delivered.

Fortunately, AWS uses IATA airport codes for their edge locations, so we can use them.

# Usage
```
node index.js --domain api-ext.admiralcloud.com
```

# Installation
Install this tool using "npm install ac-cloudfront-edge-locator"

# Links
- [Website](https://www.admiralcloud.com/)
- [Twitter (@admiralcloud)](https://twitter.com/admiralcloud)
- [Facebook](https://www.facebook.com/MediaAssetManagement/)

# License
[MIT License](https://opensource.org/licenses/MIT) Copyright © 2009-present, AdmiralCloud, Mark Poepping

# Contribution
Thanks to https://github.com/jbrooksuk/JSON-Airports for providing IATA airport codes.