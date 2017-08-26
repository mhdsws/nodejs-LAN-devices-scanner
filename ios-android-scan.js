var nmap = require('libnmap')
  , opts = {
      flags: [
        ' -T2 -Pn --script dns-service-discovery arp'
      ],
      range: [ '192.168.179.1-38'],
      ports: '5353',
      udp: true
    };

nmap.scan(opts, function(err, report) {
  if (err) throw new Error(err);

  for (var item in report) {
    var hosts_array = report[item].host;
    //console.log(JSON.stringify(hosts_array));

    for (var host in hosts_array) {
      var ip_mac_addresses_array = hosts_array[host].address;
      var host_name = hosts_array[host].hostnames[0].hostname[0].item.name;
      for (var address in ip_mac_addresses_array) {
        if((String(ip_mac_addresses_array[address].item.vendor).indexOf("Apple") != -1)||(String(ip_mac_addresses_array[address].item.vendor).indexOf("Samsung") != -1)||(String(ip_mac_addresses_array[address].item.vendor).indexOf("LG") != -1)||(String(ip_mac_addresses_array[address].item.vendor).indexOf("HTC") != -1))
          console.log({Host_Name: host_name, IP: ip_mac_addresses_array[address-1].item.addr , MAC: ip_mac_addresses_array[address].item.addr, Vendor: ip_mac_addresses_array[address].item.vendor});
      }
    }
  }
});