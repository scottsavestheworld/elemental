// Elemental Globals

const Module = function (elementalName, ...essence) {
  let elemental = new Module[elementalName](...essence);
  return elemental;
};
const Component = function (elementalName, ...essence) {
  let elemental = new Component[elementalName](...essence);
  return elemental;
};
const $E = {};

$E.App = null;
$E.isDebugMode = true;

//--------------------------------------------------------- Layout Builder

$E.renderLayout = function (elemental, newLayout = [], oldLayout = []) {
  let parts = elemental.parts;
  for (let i = 0; i < oldLayout.length; i++) {
    if (oldLayout[i] !== newLayout[i]) {
      elemental.remove(parts[oldLayout[i]]);
    }
  }

  for (let i = 0; i < newLayout.length; i++) {
    if (newLayout[i] !== oldLayout[i]) {
      elemental.add(parts[newLayout[i]], i);
    }
  }
}

//--------------------------------------------------------- String Manipulations

$E.capitalize = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

$E.getInitial = function (string) {
  return string.charAt(0).toUpperCase();
};

$E.getInitials = function (stringArray) {
  stringArray = stringArray || [];
  var initials = '';
  for (let word of stringArray) {
    initials += $E.getInitial(word);
  }
  return initials;
};

//--------------------------------------------------------- Errors and Logs

$E.error = function (message) {
  console.error(message);
};

$E.log = function (message) {
  console.log(message);
};

$E.warn = function (message) {
  console.warn(message);
};

//--------------------------------------------------------- Object Checks

$E.isEmpty = function (object) {
  if ($E.validateType('array', object)) {
    return object.length === 0;
  }
  else if ($E.validateType('object', object)) {
    return Object.keys(object).length === 0;
  }
  $E.warn(`$E.isEmpty(): "${object}" is not an object or array.`);
};

//--------------------------------------------------------- Variable Type Check

$E.validateType = function (type, value) {
  if (typeof type === 'string') {
    if ($E.validTypes.indexOf(type) === -1) {
      return false;
    }
    return $E[type](value, {value}) === value;
  }
  else if (Array.isArray(type)) {
    if (type.indexOf(value) > -1) {
      return true;
    }
  }
  return false;
};

$E.array = function (value, newValue) {
  if (typeof newValue === 'undefined') { newValue = []; }
  return Array.isArray(value) ? value : newValue;
};

$E.boolean = function (value, newValue) {
  if (typeof newValue === 'undefined') { newValue = false; }
  return typeof value === 'boolean' ? value : newValue;
};

$E.elemental = function (value, newValue) {
  return ($E.object(value, false) && value.isElemental) ? value : newValue;
};

$E.function = function (value, newValue) {
  if (typeof newValue === 'undefined') { newValue = function () {}; }
  return typeof value === 'function' ? value : newValue;
};

$E.number = function (value, newValue) {
  if (typeof newValue === 'undefined') { newValue = 0; }
  return typeof value === 'number' && !isNaN(value) ? value : newValue;
};

$E.object = function (value, newValue) {
  if (typeof newValue === 'undefined') { newValue = {}; }
  return typeof value === 'object' && !Array.isArray(value) && value !== null ? value : newValue;
};

$E.string = function (value, newValue) {
  if (typeof newValue === 'undefined') { newValue = ''; }
  return typeof value === 'string' ? value : newValue;
};

$E.time = function (value, newValue) {
  return value === 'clock' || 
    value === 'countdown' || 
    value === 'elapsed' || 
    value === 'timer' ? value : newValue;
};

$E.validTypes = [
  'array',
  'boolean',
  'elemental',
  'function',
  'number',
  'object',
  'string',
  'time',
];

// ========================================================
//                      TIME UTILITIES
// ========================================================

//--------------------------------------------------------- Get Interval

$E.getInterval = function (intervalString) {
  var timeout  = 0;
  var interval = 0;

  if (intervalString === 'every day' || intervalString === 'every hour' || intervalString === 'every minute') {
    var now = $E.formatTime(null, '[H],[m],[s]').split(',').map(Number);
    switch (intervalString) {
      case 'every day':
        timeout  = 86400 - ((now[0] * 3600) + (now[1] * 60) + now[2]);
        interval = 86400;
        break;
      case 'every hour':
        timeout  = 3600 - ((now[1] * 60) + now[2]);
        interval = 3600;
        break;
      case 'every minute':
        timeout  = 60 - now[2];
        interval = 60;
        break;
      default:
    };
  }

  if (interval) {
    return { 'timeout' : timeout, 'interval' : interval };
  } else {
    return null;
  }
};

/*--------------------------------------------------------- Round Time
 increment of 1000 rounds to nearest past second
 increment of 60000 rounds to nearest past minute
 increment of 3600000 rounds to nearest past hour
*/

$E.roundTime = function (timestamp, increment) {
  var roundedTime = $E.number(timestamp, 0);
  if (timestamp) {
    return Math.floor(timestamp / increment) * increment;
  } else {
    return null;
  }
};

$E.getMinute = function (timestamp) {
  return Math.round(timestamp / 60000);
};


/*--------------------------------------------------------- Format Time

 [D]      Day of month without 0     :  1 - 31
 [DD]     Day of month with 0        : 01 - 31
 [DDD]    Day of week abbreviated    : Sun - Sat
 [DDDD]   Day of week full           : Sunday - Saturday

 [M]      Month number without 0     :  1 - 12
 [MM]     Month number with 0        : 01 - 12
 [MMM]    Month name abbreviated     : Jan - Dec
 [MMMM]   Month name full            : January - December

 [YY]     Year number last 2 digits  : 16
 [YYYY]   Year number full           : 2016

 [H]      24-hour hour without 0     :  0 - 23
 [HH]     24-hour hour with 0        : 00 - 23
 [h]      12-hour hour without 0     :  1 - 12
 [hh]     12-hour hour with 0        : 01 - 12

 [m]      Minute without 0           :  0 - 59
 [mm]     Minute with 0              : 00 - 59

 [s]      Second without 0           :  0 - 59
 [ss]     Second with 0              : 00 - 59

 [pm]     AM/PM for 12-hour clock

*/

$E.formatTime = function (timestamp, format) {
  format = $E.string(format, '');
  var smartTime = format.indexOf('[ST]') > -1 ? true : false;
  var smartDate = format.indexOf('[SD]') > -1 ? true : false;
  format.replace(/\[ST\]/g, '').replace(/\[SD\]/g, '');

  format    = Dictionary.timeFormats[format] || format;
  timestamp = $E.number(timestamp, Date.now());

  function pad0(number)  { return number < 10 ? '0' + number : number; }

  var n       = new Date(Date.now());
  var t       = new Date(timestamp);
  var f       = {};
      f.D     = t.getDate();
      f.DD    = pad0(f.D);
      f.DDDD  = Dictionary.timeStrings.days[t.getDay()];
      f.DDD   = f.DDDD.substring(0, 3);
      f.M     = t.getMonth() + 1;
      f.MM    = pad0(f.M);
      f.MMMM  = Dictionary.timeStrings.months[t.getMonth()];
      f.MMM   = f.MMMM.substring(0, 3);
      f.YYYY  = t.getFullYear();
      f.YY    = f.YYYY.toString().substr(2);
      f.H     = t.getHours();
      f.HH    = pad0(f.H);
      f.h     = f.H > 12 ? f.H - 12 : f.H == 0 ? 12 : f.H;
      f.hh    = pad0(f.h);
      f.m     = t.getMinutes();
      f.mm    = pad0(f.m);
      f.s     = t.getSeconds();
      f.ss    = pad0(f.s);
      f.pm    = f.H < 12 ? Dictionary.timeStrings.am : Dictionary.timeStrings.pm;

  var today = parseInt(n.getFullYear() + '' + pad0(n.getMonth() + 1) + '' + pad0(n.getDate()));
  timestamp = parseInt(f.YYYY + '' + f.MM + '' + f.DD);

  if (format == '[date or time]') {
    if (timestamp == today) { format = Dictionary.timeFormats['[time]']; }
    else { format = Dictionary.timeFormats['[date]']; }
  }
  if (smartTime) {
    if (timestamp == today) {
      format = Dictionary.timeStrings.today;
    }
    else if (timestamp == today + 1) {
      format = Dictionary.timeStrings.tomorrow;
    }
    else if (timestamp == today - 1) {
      format = Dictionary.timeStrings.yesterday;
    }
    else if (n.getFullYear() == f.YYYY) {
      switch (format) {
        case Dictionary.timeFormats['[date]']:
          format = Dictionary.timeFormats['[date this year]'];
          break;
        case Dictionary.timeFormats['[full date]']:
          format = Dictionary.timeFormats['[full date this year]'];
      }
    }
  }

  for (var i in f) {
    var regex = new RegExp('\\[' + i + '\\]', 'g');
    format = format.replace(regex, f[i]);
  }

  return (format);
};

/*--------------------------------------------------------- Format Timer
 [d] Days
 [h] Hours
 [m] Minutes
 [s] Seconds
*/

$E.formatTimer = function (timestamp, format) {
  format = $E.string(format, '[d]:[h]:[m]:[s]');
  timestamp      = Math.round(timestamp / 1000);
  var clearEmpty = true;
  var trimZero   = true;

  var timer = {};
    timer.d = Math.floor((timestamp % 31536000) / 86400);
    timer.h = Math.floor(((timestamp % 31536000) % 86400) / 3600);
    timer.m = Math.floor((((timestamp % 31536000) % 86400) % 3600) / 60);
    timer.s = (((timestamp % 31536000) % 86400) % 3600) % 60;

  for (var i in timer) {
    if (i == 'd' && format.indexOf('[h]') < 0 && format.indexOf('[d]') > -1) {
      timer[i] ++;
    }
    else if (i == 'h' && format.indexOf('[m]') < 0 && format.indexOf('[h]') > -1) {
      timer[i] ++ ;
    }
    else if (i == 'm' && format.indexOf('[s]') < 0 && format.indexOf('[m]') > -1) {
      timer[i] ++;
    }

    var regex = new RegExp('\\[' + i + '\\]', 'g');

    if (clearEmpty && (timer[i] != 0 || i == 'm')) {
      format = format.substring(format.indexOf('[' + i + ']'));
      clearEmpty = false;
    }
    else if (trimZero || trimZero && i == 'm') {
      trimZero = false;
    }
    else if (timer[i] < 10) {
      timer[i] = '0' + timer[i];
    }
    format = format.replace(regex, timer[i])
  }

  return (format)
};

// ========================================================
//                        KEY CODES
// ========================================================

$E.keyCode = function (keyName) {
  var keys = {
    backspace  : [8],
    tab        : [9],
    enter      : [13],
    shift      : [16],
    ctrl       : [17],
    alt        : [18],
    pause      : [19],
    capslock   : [20],
    escape     : [27],
    spacebar   : [32],
    pageup     : [33],
    pagedown   : [34],
    end        : [35],
    home       : [36],
    left       : [37],
    up         : [38],
    right      : [39],
    down       : [40],
    insert     : [45],
    delete     : [46],
    0          : [48, 96],
    1          : [49, 97],
    2          : [50, 98],
    3          : [51, 99],
    4          : [52, 100],
    5          : [53, 101],
    6          : [54, 102],
    7          : [55, 103],
    8          : [56, 104],
    9          : [57, 105],
    a          : [65],
    b          : [66],
    c          : [67],
    d          : [68],
    e          : [69],
    f          : [70],
    g          : [71],
    h          : [72],
    i          : [73],
    j          : [74],
    k          : [75],
    l          : [76],
    m          : [77],
    n          : [78],
    o          : [79],
    p          : [80],
    q          : [81],
    r          : [82],
    s          : [83],
    t          : [84],
    u          : [85],
    v          : [86],
    w          : [87],
    x          : [88],
    y          : [89],
    z          : [90],
    window     : [91, 92],
    command    : [91, 92],
    select     : [93],
    multiply   : [106],
    add        : [107],
    subtract   : [108],
    decimal    : [110],
    divide     : [111],
    f1         : [112],
    f2         : [113],
    f3         : [114],
    f4         : [115],
    f5         : [116],
    f6         : [117],
    f7         : [118],
    f8         : [119],
    f9         : [120],
    f10        : [121],
    f11        : [122],
    f12        : [123],
    numlock    : [144],
    scrolllock : [145],
    ";"        : [186],
    "="        : [187],
    ","        : [188],
    "-"        : [189, 108],
    "."        : [190, 110],
    "/"        : [191, 111],
    "`"        : [192],
    "["        : [219],
    "]"        : [221],
    "'"        : [222]
  };
  return keys[keyName];
};