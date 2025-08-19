// ASCII Art Component

export class ASCIIArt {
  constructor() {
    this.logoElement = document.getElementById('ascii-logo')
    this.isMobileMode = window.innerWidth < 768
    
    this.fullLogo = `
_|_|_|                                            _|_|_|                _|           _|_|_|    _| 
_|    _|    _|_|    _|  _|_|  _|  _|_|  _|    _|  _|    _|    _|_|    _|_|_|_|       _|    _|     
_|_|_|    _|_|_|_|  _|_|      _|_|      _|    _|  _|_|_|    _|    _|    _|           _|_|_|    _| 
_|    _|  _|        _|        _|        _|    _|  _|    _|  _|    _|    _|           _|        _| 
_|_|_|      _|_|_|  _|        _|          _|_|_|  _|_|_|      _|_|        _|_|       _|        _| 
                                              _|                                                  
                                          _|_|                                                     
                                        MK3 - Teaching AI Greed`
    
    this.mobileLogo = `
_|_|_|                                   
_|    _|    _|_|    _|  _|_|  _|  _|_|   
_|_|_|    _|_|_|_|  _|_|      _|_|       
_|    _|  _|        _|        _|         
_|_|_|      _|_|_|  _|        _|         

_|_|_|                _|           _|_|_|    _| 
_|    _|    _|_|    _|_|_|_|       _|    _|     
_|_|_|    _|    _|    _|           _|_|_|    _| 
_|    _|  _|    _|    _|           _|        _| 
_|_|_|      _|_|        _|_|       _|        _| 
          MK3 - Teaching AI Greed`
    
    this.bitcoinSymbol = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣴⣶⣶⣶⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣀⣤⣾⣿⡿⠿⠛⠛⠛⠛⠛⠛⠻⢿⣿⣿⣦⣄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⣼⣿⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠿⣿⣷⣄⠀⠀⠀⠀
⠀⠀⠀⣰⣿⡿⠋⠀⠀⠀⠀⠀⣿⡇⠀⢸⣿⡇⠀⠀⠀⠀⠀⠈⢿⣿⣦⡀⠀⠀
⠀⠀⣸⣿⡿⠀⠀⠀⠸⠿⣿⣿⣿⡿⠿⠿⣿⣿⣿⣶⣄⠀⠀⠀⠀⢹⣿⣷⠀⠀
⠀⢠⣿⡿⠁⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⠈⣿⣿⣿⠀⠀⠀⠀⠀⢹⣿⣧⠀
⠀⣾⣿⡇⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⢀⣠⣿⣿⠟⠀⠀⠀⠀⠀⠈⣿⣿⠀
⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⢸⣿⣿⡿⠿⠿⠿⣿⣿⣥⣄⠀⠀⠀⠀⠀⠀⣿⣿⠀
⠀⢿⣿⡇⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⢻⣿⣿⣧⠀⠀⠀⠀⢀⣿⣿⠀
⠀⠘⣿⣷⡀⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⣼⣿⣿⡿⠀⠀⠀⠀⣸⣿⡟⠀
⠀⠀⢹⣿⣷⡀⠀⠀⢰⣶⣿⣿⣿⣷⣶⣶⣾⣿⣿⠿⠛⠁⠀⠀⠀⣸⣿⡿⠀⠀
⠀⠀⠀⠹⣿⣷⣄⠀⠀⠀⠀⠀⣿⡇⠀⢸⣿⡇⠀⠀⠀⠀⠀⢀⣾⣿⠟⠁⠀⠀
⠀⠀⠀⠀⠘⢻⣿⣷⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣿⡿⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠛⢿⣿⣷⣶⣤⣤⣤⣤⣤⣤⣴⣾⣿⣿⠟⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠻⠿⠿⠿⠿⠟⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀

                      ₿ BITCOIN ₿                      
                  << DIGITAL GOLD FOUND >>`
    
    this.ethereumSymbol = `
⠀⠀⠀⠀⠀⠀⠀⠀⢠⠃⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠠⠃⠀⣿⣿⢆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡐⠁⠀⠀⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡔⠀⠀⠀⠀⣿⣿⣿⣷⣷⡀⠀⠀⠀⠀
⠀⠀⠀⢀⠌⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀
⠀⠀⢀⠊⠀⠀⠀⠀⢀⣠⣿⣿⣿⣿⣿⣿⣗⡀⠀⠀
⠀⢠⠁⠀⣀⣤⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀
⢰⡥⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆
⠰⡢⢙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⣋⡥⡆
⠀⠐⢄⠁⠂⢍⠛⢿⣿⣿⣿⣿⡿⠛⣉⣰⣼⣿⠋⠀
⠀⠀⠀⢢⡀⠀⠈⠐⠌⡙⢛⢡⣶⣷⣿⣿⡿⠁⠀⠀
⠀⠀⠀⠀⠑⣀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⢂⠀⠀⠀⣿⣿⣿⡯⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠱⡀⠀⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⢄⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀

                      ♦ ETHEREUM ♦                      
                  << SMART CONTRACTS ACTIVE >>`
    
    
    this.rocketSymbol = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣠⣤⣲⣶⣤⣿⣾⣿⣿⣿⣿⣿⣿⣿⣾⣾⣵⣶⣲⣤⢤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣄⣶⣾⣿⣿⣿⣿⡿⠿⠛⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠛⠛⠛⠻⠿⣿⣿⣿⣿⣽⣴⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣷⣿⡿⠿⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠻⢿⣿⣿⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⡿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣿⣿⣧⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣢⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣽⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣟⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣞⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⡆⠀⠀⠀⠀⣿⣿⠀⠀⠀⢀⣾⣶⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⡽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⢉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣷⣶⣶⣶⣶⣿⣿⠀⠀⠀⠀⣴⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡟⠛⠛⠛⠛⣿⣿⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣽⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡿⠃⠀⠀⠀⠀⢿⡿⠀⠀⠀⠀⢿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⡿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⡻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⡷⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢿⣿⣷⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣾⣿⣿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠻⡿⣿⣿⣷⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣴⣶⣿⣿⣿⡿⠿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠻⠿⢿⣿⣿⣿⣿⣶⣶⣶⣶⣦⡀⠀⠀⠀⠀⣴⣶⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⠿⠟⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠻⠟⠛⠻⣿⣿⣷⠀⠀⡀⣰⣿⣿⠟⠿⠟⠝⠛⠉⠑⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢺⣿⣿⡆⠀⣰⣿⣿⡽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇⣴⣿⣿⡏⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣻⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠃⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣄⣴⣄⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣾⣾⣿⣿⣿⣿⡦⡀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⠿⢿⣿⣿⡷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣜⣿⣿⠟⠁⠄⡙⢿⣿⣿⢄⠀⠀⠀⠀⠀⠀⣴⣿⣿⠟⡁⠄⠂⡙⢿⣿⣞⣄⢀⣀⡤⢠⣤⣴⣠⣶⣶⣴⣶⣾⣷⣷⣶⣶⣶⣂⣦⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⠏⡈⠐⠠⠐⠠⠿⣿⣯⣧⣤⣤⣤⣤⣼⣿⣿⠋⠄⡐⢈⠐⠠⢈⢻⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠛⢻⣿⣿⣿⣿⣿⣿⣿⣯⣶⡤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣽⣿⡏⠐⠠⢁⠂⡁⢂⠐⣹⣿⣿⣿⣿⣿⣿⣿⣿⡇⡈⠐⡀⠂⠌⡐⢀⠂⢛⠛⡛⢉⠉⠄⠠⠹⣿⣿⣿⣿⣿⣿⠃⡈⠼⣿⣿⣿⣿⣿⣿⡟⠻⢿⣿⣷⣷⣢⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢀⣀⣀⠀⠀⠀⠀⠀⢠⣿⣿⡟⡠⢁⠂⠄⠂⠌⡁⠌⡘⢿⡿⠛⢿⡿⠛⢿⡿⠃⠄⠡⢀⠁⢂⠉⠄⡈⠄⢂⠐⠠⠈⢄⠁⡂⣌⣛⡛⠛⠋⠠⠐⡀⢂⠘⠻⠿⠿⠿⠋⢀⠂⠄⡈⠹⢿⣿⣿⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⢄⣤⣀⠀⠀⠀
⣴⣯⣴⣬⣵⣿⣿⣶⣶⣯⣿⣿⠁⠔⠠⠈⠄⡁⠂⠔⠠⠐⠠⠐⡈⣤⡄⠡⠀⠄⡈⠄⡁⣂⠌⠠⢈⠐⠠⠈⢄⣬⣶⣿⣿⣿⣿⣿⣿⣿⠇⡈⠄⡁⠢⢐⠨⠐⠄⢂⠐⡈⠄⡈⠔⠠⢁⠂⠌⣻⣿⣿⡧⡀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣾⣢⠀
⠙⠿⠿⣿⡿⢿⣿⣿⣿⣿⣿⠇⡌⠠⠁⠌⣶⣿⣿⣮⠐⡁⢂⠡⢰⣿⣿⠂⡁⢂⠐⢠⣿⣿⣿⣧⠂⠌⡀⠃⠜⢿⠟⠛⢉⠡⢁⠠⠀⠄⢂⠐⠠⢀⠡⠂⠤⠡⠌⡀⠆⠰⠠⠐⡈⠔⠂⠌⡐⢀⠙⣿⣿⣿⠄⠀⠀⠀⠀⠀⠀⡠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣷
⢀⣤⣌⣾⣿⣿⣿⣵⣿⣿⡿⠀⠄⠡⢈⡐⢿⣿⣿⡿⠁⡐⢰⣿⣿⣿⣿⣿⣿⡆⠈⠌⢿⣿⣿⠟⢀⠂⠄⠡⢨⣶⣶⣿⣶⣶⣶⣶⣷⣮⡄⡈⠐⡀⢂⠑⠂⢃⠒⠐⢊⠐⡁⠒⡐⢈⠐⡈⡐⢀⠂⠌⢿⣿⣟⣆⠀⠀⠀⢀⣴⣿⣿⡟⠉⠻⣿⣿⣿⣿⣿⡿
⢺⣿⣿⡿⣿⣿⣿⣿⣿⣿⠇⡈⠄⡁⠂⡄⠂⠄⠠⠐⠠⢀⠡⢉⠩⢉⠉⢋⠁⢂⠡⠈⠄⠠⠀⠌⠠⠈⡄⠁⠆⠙⢋⠛⠙⠛⠛⠛⠛⢛⠃⠄⠡⢀⠡⣈⠡⣈⢈⠡⡈⢄⠡⡁⢌⡈⢄⡁⢌⠠⡈⠐⡈⢿⣿⣟⣄⣰⣶⣿⣿⣿⣿⣤⢈⠐⣀⢙⣿⣿⣷⠃
⠀⠉⠉⠀⠀⠀⢈⣽⣿⡿⢈⠐⠠⢀⠡⠄⠡⠈⠄⡁⢂⠰⢀⠂⡐⠠⠈⠄⡈⠄⢂⠡⠈⠄⠡⠈⠄⠡⠄⠩⠄⠃⠄⢂⠡⠈⠄⠃⠌⢠⠈⠄⠡⠂⠔⠠⠐⠄⠢⠐⠄⠢⠐⠄⠢⠄⠢⠄⠢⠠⠁⠆⡐⠘⣿⣿⣿⣿⣿⠿⣿⣿⣿⣿⣿⣦⣠⣾⣿⣿⠃⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇⠆⡈⠐⡀⠒⡈⠒⠑⢂⠒⠐⢂⠂⠒⡀⢃⠘⡀⢂⠘⡀⢂⠃⡘⠂⢃⠘⢂⠊⡐⢈⠂⡘⢀⠂⠡⢈⠂⠌⡀⠂⠌⡐⢁⠊⡐⢁⠊⡐⢁⠊⡐⢁⠊⡐⢂⠁⢂⠑⡀⢃⠒⠠⠁⢿⣿⣿⣿⠁⢂⠙⢿⣿⣿⣿⣿⣿⣿⠗⠁⠀⠀
⠀⠀⠀⠀⠀⠀⣿⣿⣿⠇⠂⠄⠡⡀⢡⠁⡉⢌⠠⡁⡉⠄⡉⢄⠡⡁⢌⠠⡁⢡⠈⡄⠡⢈⠌⡠⢉⠠⡁⢌⠠⡁⢉⡈⠡⢉⡈⡁⣉⢈⠡⡉⢠⠁⡌⢠⠁⡌⢠⠁⡌⢠⠁⡌⢐⠈⡌⢠⠁⢌⠠⢈⠡⢈⢸⣿⣿⣿⡇⠂⠌⣀⣽⣿⣿⣿⠟⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡿⣿⣿⠀⠃⠌⡐⠠⠂⠔⠠⠂⠔⠠⠐⠰⢀⠢⠐⠄⠢⠐⠄⠂⠔⠠⢁⠢⠐⠄⠢⠐⠄⠢⠐⠄⠢⠠⢁⠂⡐⠄⠄⠢⠐⠄⠢⠐⠄⠢⠐⠄⠢⠐⠄⠢⠐⠄⠢⠐⠠⠂⠌⠠⠂⠄⡡⢈⠸⣿⣿⣿⣿⣶⣿⣿⣿⡿⠛⠉⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣧⣿⣿⠈⡐⢠⠀⡑⠌⢂⠡⠘⡀⢃⢉⠐⢂⡐⢁⠊⠄⡑⢈⠡⠘⠠⡁⢂⢁⠊⡐⢁⠊⡐⢁⠊⡐⢁⠂⡘⠠⢈⠂⡑⢈⠂⡑⢈⠂⡑⢈⠂⡑⢈⠂⡑⠈⡄⠃⠌⠡⠘⡈⠡⢈⠐⡐⠠⢌⣿⣿⣿⣿⡻⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣣⣿⣿⠐⡀⢂⠐⠠⡁⢂⠡⠌⡐⠤⠈⠤⠁⠄⢂⠡⠌⡐⠠⠡⢈⠡⠐⡈⠄⢂⠡⢂⠡⠈⠄⡂⠡⢂⠡⠄⠡⢂⠡⠐⠄⡡⠐⠠⡁⠌⠠⡁⠌⡀⠆⣈⠡⠠⠡⢈⡁⠆⡁⢂⠁⠂⠄⠡⢸⣿⣿⣏⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣿⣿⣿⡆⠐⠠⢈⠐⡁⢂⠂⠒⡀⢂⠑⡀⢃⠘⡀⢂⠒⡀⢃⠒⡀⢂⠑⡐⢈⠂⡐⠂⢂⠑⢂⠐⡁⢂⠂⡘⠐⢂⠂⡑⠂⠄⢃⠒⠐⡈⠒⡀⠒⡐⢂⠐⡀⢃⠒⠠⠐⢂⠐⡀⠊⠄⡁⠂⣽⣿⣿⠌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⣿⣿⡇⠌⡐⠠⠈⠄⡃⣈⠡⢈⠄⡡⢈⠄⡡⢈⠄⡡⢈⠄⣂⠡⣈⠐⡈⢄⠡⣈⠡⡈⢌⠠⡁⢌⠠⡁⢌⡈⠄⡡⢈⠌⡈⢄⡈⢡⢈⠁⡌⢁⠄⡡⢈⠄⡡⢈⡁⢡⢈⠐⠠⢁⠂⠄⢡⣿⣿⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⡄⠠⠁⠌⠠⠡⠄⠢⠄⠆⠰⠀⠆⠰⠀⠆⠰⠀⠆⠤⠐⡀⠆⠰⠀⠆⠤⠐⠄⠢⠐⠄⠢⠐⠄⠢⠀⠆⠰⠀⠆⠰⠠⠐⠄⠢⠐⠄⠢⠐⠄⠢⠐⠄⠢⠐⠄⠂⠌⡐⠄⡈⠐⣸⣿⣟⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣧⠡⠈⠄⡁⢂⠘⡐⢂⠊⡐⢁⠊⡐⢁⠊⡐⢁⠊⡐⠒⠐⡈⠒⢁⠊⡐⢈⠂⡑⢈⠂⡑⢈⠂⡑⢈⠂⡑⢈⠂⡑⠂⡑⠊⡐⢁⠊⡐⢁⠊⡐⢁⠊⡐⢁⠊⡐⢂⠐⠠⢀⢱⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣷⡁⢂⠐⠠⢈⠐⠠⡁⢌⠠⡁⣌⠠⡁⣌⠠⡁⢌⡈⢡⢈⢡⠈⡄⣉⠠⡁⢌⠠⡁⣌⠠⡁⣌⠠⡁⡌⢠⡁⢌⡁⡄⡡⢈⠄⡡⣈⠄⡡⣈⠄⡡⢈⠄⢂⠡⠀⠌⡐⢠⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣄⠌⡐⠠⢈⠐⡀⢂⠡⠐⠠⠐⢠⠠⠐⠄⢂⠰⢀⠢⠀⠆⡐⢀⠂⠔⠠⠂⠔⠠⠐⠠⠠⠐⠄⠰⠀⠄⠂⠤⠐⡀⠆⡐⠄⠠⢂⠐⠠⠐⣀⠂⠌⡀⢂⠁⢂⣰⣿⣿⡗⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣷⣤⠁⠌⡐⢀⠂⠄⡁⢂⠁⡂⠄⠡⠈⠄⠂⠄⢂⠁⢂⡐⢠⠈⡂⠡⠈⠄⠡⢈⠂⢡⠈⠄⡡⠘⠠⢁⠂⠡⠐⡐⠠⡈⢐⠀⡊⠄⠡⢀⠂⡐⢀⠂⢌⣴⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⣿⣿⣿⣦⡔⢂⠈⣐⣀⣆⣐⣠⣈⣄⣡⣈⣐⠈⠄⡈⣄⣐⣀⣂⣄⣡⣈⣄⣁⣂⣌⣀⣂⣐⣠⣁⣂⠄⡈⠄⣡⣀⣡⣐⣀⣂⣐⣈⣐⣀⠂⡐⣠⣾⣿⣿⡻⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⠀⢂⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡗⢠⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⡐⠸⣿⣿⢿⢿⣿⣿⣿⣿⣿⣿⡇⢠⢹⣿⣿⡍⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣜⣴⣿⣿⡞⠈⠉⠉⠚⠛⣿⣿⣧⣒⣼⣿⣟⠏⠉⠈⠁⠈⠈⠁⠒⠉⠒⠓⠚⠚⣿⣿⣷⣌⣿⣿⣿⠟⠀⠀⠁⠁⢹⣿⣿⣧⣦⣾⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢻⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠘⠻⡿⢿⣟⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

                        🚀 TO THE MOON 🚀                      
                    << ROCKET FUEL IGNITED >>`
    
    this.dividers = {
      heavy: '═'.repeat(68),
      light: '─'.repeat(68),
      double: '▓'.repeat(68),
      dots: '·'.repeat(68)
    }
    
    this.statusIcons = {
      online: '[✓]',
      warning: '[!]',
      error: '[✗]',
      processing: '[~]',
      ready: '[>]'
    }
    
    this.progressBars = {
      full: '█'.repeat(30),
      twoThirds: '█'.repeat(20) + '░'.repeat(10),
      half: '█'.repeat(15) + '░'.repeat(15),
      oneThird: '█'.repeat(10) + '░'.repeat(20),
      empty: '░'.repeat(30)
    }
  }
  
  renderLogo() {
    if (!this.logoElement) return
    
    const logo = this.isMobileMode ? this.mobileLogo : this.fullLogo
    
    // Clear any existing content and effects
    this.logoElement.textContent = ''
    this.logoElement.className = ''
    this.logoElement.style.cssText = ''
    
    // Add basic styling
    this.logoElement.classList.add('text-glow-lg')
    this.logoElement.setAttribute('data-text', logo)
    
    // Start the intro animation sequence
    this.playLogoIntroAnimation(logo)
    
    // Start periodic glitch effects after brief delay
    setTimeout(() => {
      this.startPeriodicGlitches()
    }, 1000) // Start glitches after logo displays
  }
  
  async animateLogoAppearance() {
    if (!this.logoElement) return
    
    const lines = this.logoElement.textContent.split('\n')
    this.logoElement.textContent = ''
    
    for (let i = 0; i < lines.length; i++) {
      await this.delay(100)
      this.logoElement.textContent += lines[i] + (i < lines.length - 1 ? '\n' : '')
    }
  }
  
  // Intro animation with typewriter effect and glitch
  async playLogoIntroAnimation(logo) {
    if (!this.logoElement) return
    
    console.log('Starting BerryBot logo intro animation')
    
    // Clear everything completely
    this.logoElement.className = ''
    this.logoElement.style.cssText = ''
    this.logoElement.removeAttribute('data-text')
    
    // Set proper styles for Unicode box-drawing characters
    this.logoElement.style.fontFamily = '"JetBrains Mono", "Source Code Pro", "Courier New", "Liberation Mono", "DejaVu Sans Mono", monospace'
    this.logoElement.style.fontSize = '16px'
    this.logoElement.style.lineHeight = '1'
    this.logoElement.style.whiteSpace = 'pre'
    this.logoElement.style.color = '#FFB000'
    this.logoElement.style.textAlign = 'center'
    this.logoElement.style.letterSpacing = '0'
    this.logoElement.style.fontWeight = 'normal'
    this.logoElement.style.textRendering = 'optimizeSpeed'
    
    // Brief delay to ensure fonts load
    await this.delay(300)
    
    // Start with flickering cursor effect
    this.logoElement.textContent = '█'
    this.logoElement.classList.add('cursor-flicker')
    await this.delay(200)
    
    // Clear cursor and start typewriter effect
    this.logoElement.classList.remove('cursor-flicker')
    this.logoElement.textContent = ''
    
    // Typewriter effect line by line
    const lines = logo.split('\n')
    let currentText = ''
    
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) currentText += '\n'
      
      // Type each character with variable speed
      for (let j = 0; j < lines[i].length; j++) {
        currentText += lines[i][j]
        this.logoElement.textContent = currentText
        
        // Variable typing speed with occasional glitches and missing pixels
        if (Math.random() < 0.05) {
          // Add brief corruption effect with missing pixels
          const corrupted = currentText.slice(0, -1) + '▓'
          this.logoElement.textContent = corrupted
          this.logoElement.style.color = '#ff0040'
          
          // Add missing pixel effect during corruption
          this.logoElement.classList.add('intro-missing-pixels')
          
          await this.delay(20)
          this.logoElement.textContent = currentText
          this.logoElement.style.color = '#FFB000'
          this.logoElement.classList.remove('intro-missing-pixels')
          
        } else if (Math.random() < 0.02) {
          // Just missing pixels without character corruption
          this.logoElement.classList.add('intro-missing-pixels')
          await this.delay(10)
          this.logoElement.classList.remove('intro-missing-pixels')
        }
        
        const delay = Math.random() < 0.1 ? 15 + Math.random() * 10 : 3 + Math.random() * 5
        await this.delay(delay)
      }
      
      // Brief pause at end of each line
      await this.delay(20)
    }
    
    // Final glitch effect and glow
    await this.delay(100)
    this.logoElement.classList.add('screen-tear')
    this.logoElement.style.color = '#00ffff'
    await this.delay(50)
    
    this.logoElement.classList.remove('screen-tear')
    this.logoElement.style.color = '#FFB000'
    this.logoElement.classList.add('text-glow-lg')
    
    console.log('BerryBot logo intro animation complete!')
  }
  
  // Direct logo display with proper Unicode support
  async directLogoDisplay(targetLogo) {
    // Clear everything completely
    this.logoElement.className = ''
    this.logoElement.style.cssText = ''
    this.logoElement.removeAttribute('data-text')
    
    // Set proper styles for Unicode box-drawing characters
    this.logoElement.style.fontFamily = '"JetBrains Mono", "Source Code Pro", "Courier New", "Liberation Mono", "DejaVu Sans Mono", monospace'
    this.logoElement.style.fontSize = '16px'
    this.logoElement.style.lineHeight = '1'
    this.logoElement.style.whiteSpace = 'pre'
    this.logoElement.style.color = '#FFB000'
    this.logoElement.style.textAlign = 'center'
    this.logoElement.style.letterSpacing = '0'
    this.logoElement.style.fontWeight = 'normal'
    this.logoElement.style.textRendering = 'optimizeSpeed'
    
    // Brief delay to ensure fonts load
    await this.delay(300)
    
    // Display the logo directly
    this.logoElement.textContent = targetLogo
    
    console.log('Logo displayed directly')
    
    await this.delay(500)
    
    // Set final clean state with proper styling
    this.logoElement.className = 'text-glow-lg'
    this.logoElement.style.fontFamily = '"JetBrains Mono", "Source Code Pro", "Courier New", "Liberation Mono", "DejaVu Sans Mono", monospace'
  }
  
  // Utility function to shuffle array for random brick placement
  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
  
  setMobileMode(isMobile) {
    this.isMobileMode = isMobile
    this.renderLogo()
  }
  
  glitchEffect(playSound = false) {
    if (!this.logoElement) return
    
    const originalText = this.logoElement.textContent
    const glitchChars = '░▒▓█▄▀▐▌│┤┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌'
    
    // Only play sound if explicitly requested AND we're on main page
    if (playSound && this.shouldPlayGlitchSound()) {
      this.playGlitchSound()
    }
    
    // Add CSS glitch class for visual effects
    this.logoElement.classList.add('glitch')
    
    // Apply glitch effect multiple times
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        let glitchedText = ''
        for (let char of originalText) {
          if (char !== ' ' && char !== '\n' && Math.random() < 0.08) {
            glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)]
          } else {
            glitchedText += char
          }
        }
        this.logoElement.textContent = glitchedText
        
        // Add random color shifts
        if (Math.random() < 0.3) {
          this.logoElement.style.color = ['#ff0040', '#00ffff', '#ffff00'][Math.floor(Math.random() * 3)]
        }
        
        // Restore original after brief delay
        setTimeout(() => {
          this.logoElement.textContent = originalText
          this.logoElement.style.color = ''
        }, 40 + Math.random() * 30)
      }, i * 80)
    }
    
    // Remove glitch class after effect completes
    setTimeout(() => {
      this.logoElement.classList.remove('glitch')
    }, 800)
  }
  
  // Check if we should play glitch sound (only on main page, not during boot)
  shouldPlayGlitchSound() {
    // Don't play during boot sequence
    const bootSequence = document.getElementById('boot-sequence')
    const bootVisible = bootSequence && bootSequence.style.display !== 'none'
    
    // Don't play if main content isn't visible yet
    const mainContent = document.getElementById('main-content')
    const mainVisible = mainContent && mainContent.style.display !== 'none'
    
    console.log('Glitch sound check:', {
      bootVisible,
      mainVisible,
      shouldPlay: !bootVisible && mainVisible
    })
    
    if (bootVisible) {
      return false // Boot sequence is visible, don't play sound
    }
    
    if (!mainVisible) {
      return false // Main content not visible, don't play sound
    }
    
    return true // Main page is active, play the sound
  }
  
  // Play glitch sound effect
  playGlitchSound() {
    console.log('🎵 playGlitchSound() called')
    try {
      // Try to access the global boot sequence audio system
      if (window.berryBotAudio) {
        console.log('🎵 Using global berryBotAudio system')
        window.berryBotAudio.playGlitchSound()
        return
      }
      
      // Fallback: Create and play glitch audio directly
      console.log('🎵 Using fallback audio - creating new Audio instance')
      const glitchAudio = new Audio('./src/assets/audio/glitch.mp3')
      glitchAudio.volume = 0.4
      glitchAudio.currentTime = 0
      
      glitchAudio.addEventListener('canplaythrough', () => {
        console.log('🎵 Glitch audio ready to play')
      })
      
      glitchAudio.addEventListener('error', (e) => {
        console.error('🎵 Glitch audio error:', e)
      })
      
      glitchAudio.play().then(() => {
        console.log('🎵 Logo glitch sound played successfully')
      }).catch(e => {
        console.error('🎵 Could not play logo glitch sound:', e)
      })
    } catch (e) {
      console.error('🎵 Logo glitch sound not available:', e)
    }
  }
  
  // Add periodic glitch effects to the logo
  startPeriodicGlitches() {
    if (!this.logoElement) return
    
    // Random glitches every 8-15 seconds
    const scheduleNextGlitch = () => {
      const delay = Math.random() * 7000 + 8000 // 8-15 seconds
      setTimeout(() => {
        if (Math.random() < 0.8) { // 80% chance to trigger
          this.triggerRandomGlitch()
        }
        scheduleNextGlitch() // Schedule next glitch
      }, delay)
    }
    
    // Passive pixel displacement effects every 2-4 seconds
    const schedulePassiveGlitch = () => {
      const delay = Math.random() * 2000 + 2000 // 2-4 seconds
      setTimeout(() => {
        if (Math.random() < 0.85) { // 85% chance to trigger
          this.triggerPassivePixelGlitch()
        }
        schedulePassiveGlitch() // Schedule next passive glitch
      }, delay)
    }
    
    // Additional random artifacts every 1-3 seconds
    const scheduleRandomArtifacts = () => {
      const delay = Math.random() * 2000 + 1000 // 1-3 seconds
      setTimeout(() => {
        if (Math.random() < 0.6) { // 60% chance to trigger
          this.triggerRandomArtifact()
        }
        scheduleRandomArtifacts() // Schedule next artifact
      }, delay)
    }
    
    // Special smiley face glitch every 30 seconds
    const scheduleSmileGlitch = () => {
      const delay = 30000 // 30 seconds
      setTimeout(() => {
        this.triggerSmileGlitch()
        scheduleSmileGlitch() // Schedule next smile glitch
      }, delay)
    }
    
    scheduleNextGlitch()
    schedulePassiveGlitch()
    scheduleRandomArtifacts()
    scheduleSmileGlitch()
  }
  
  // Passive pixel displacement glitch effects
  triggerPassivePixelGlitch() {
    if (!this.logoElement) return
    
    // Check if we're currently showing a crypto symbol (during smile glitch)
    const isShowingCrypto = this.logoElement.textContent.includes('BITCOIN') || 
                           this.logoElement.textContent.includes('ETHEREUM') || 
                           this.logoElement.textContent.includes('TO THE MOON')
    
    if (isShowingCrypto) return // Skip if crypto symbol is showing
    
    const glitchType = Math.random()
    
    if (glitchType < 0.3) {
      // Subtle pixel shift - very brief
      this.logoElement.classList.add('pixel-shift-subtle')
      setTimeout(() => {
        this.logoElement.classList.remove('pixel-shift-subtle')
      }, 150 + Math.random() * 100)
      
    } else if (glitchType < 0.6) {
      // Minor displacement with color aberration
      this.logoElement.classList.add('pixel-displacement-minor')
      setTimeout(() => {
        this.logoElement.classList.remove('pixel-displacement-minor')
      }, 200 + Math.random() * 150)
      
    } else if (glitchType < 0.85) {
      // Scanline interference
      this.logoElement.classList.add('scanline-interference')
      setTimeout(() => {
        this.logoElement.classList.remove('scanline-interference')
      }, 300 + Math.random() * 200)
      
    } else {
      // Brief chromatic aberration
      this.logoElement.classList.add('chromatic-aberration-brief')
      setTimeout(() => {
        this.logoElement.classList.remove('chromatic-aberration-brief')
      }, 100 + Math.random() * 100)
    }
  }
  
  // Random visual artifacts for more frequent glitching
  triggerRandomArtifact() {
    if (!this.logoElement) return
    
    // Check if we're currently showing a crypto symbol
    const isShowingCrypto = this.logoElement.textContent.includes('BITCOIN') || 
                           this.logoElement.textContent.includes('ETHEREUM') || 
                           this.logoElement.textContent.includes('TO THE MOON')
    
    if (isShowingCrypto) return // Skip if crypto symbol is showing
    
    const artifactType = Math.random()
    
    if (artifactType < 0.2) {
      // Quick color flash
      const colors = ['#ff0040', '#00ffff', '#ffff00', '#ff8000', '#8000ff']
      this.logoElement.style.color = colors[Math.floor(Math.random() * colors.length)]
      setTimeout(() => {
        this.logoElement.style.color = '#FFB000'
      }, 50 + Math.random() * 100)
      
    } else if (artifactType < 0.35) {
      // Brief opacity flicker
      this.logoElement.classList.add('opacity-flicker')
      setTimeout(() => {
        this.logoElement.classList.remove('opacity-flicker')
      }, 100 + Math.random() * 200)
      
    } else if (artifactType < 0.5) {
      // Random character corruption - very brief
      const originalText = this.logoElement.textContent
      const corruptChars = '▓▒░█▄▀▐▌│┤┐└┴┬├─┼╞╟╚╔╩╦╠═╬'
      let corruptedText = ''
      
      for (let char of originalText) {
        if (char !== ' ' && char !== '\n' && Math.random() < 0.02) {
          corruptedText += corruptChars[Math.floor(Math.random() * corruptChars.length)]
        } else {
          corruptedText += char
        }
      }
      
      this.logoElement.textContent = corruptedText
      setTimeout(() => {
        this.logoElement.textContent = originalText
      }, 80 + Math.random() * 120)
      
    } else if (artifactType < 0.65) {
      // Micro displacement with shadow
      this.logoElement.classList.add('micro-displacement')
      setTimeout(() => {
        this.logoElement.classList.remove('micro-displacement')
      }, 120 + Math.random() * 80)
      
    } else if (artifactType < 0.8) {
      // Brief static overlay
      this.logoElement.classList.add('static-overlay')
      setTimeout(() => {
        this.logoElement.classList.remove('static-overlay')
      }, 60 + Math.random() * 90)
      
    } else if (artifactType < 0.9) {
      // Horizontal line glitch
      this.logoElement.classList.add('horizontal-line-glitch')
      setTimeout(() => {
        this.logoElement.classList.remove('horizontal-line-glitch')
      }, 150 + Math.random() * 100)
      
    } else {
      // Random brightness flicker
      this.logoElement.classList.add('brightness-flicker')
      setTimeout(() => {
        this.logoElement.classList.remove('brightness-flicker')
      }, 200 + Math.random() * 150)
    }
  }
  
  // More subtle random glitch effects with screen tear
  triggerRandomGlitch() {
    if (!this.logoElement) return
    
    // Check if we're currently showing a crypto symbol (during smile glitch)
    const isShowingCrypto = this.logoElement.textContent.includes('BITCOIN') || 
                           this.logoElement.textContent.includes('ETHEREUM') || 
                           this.logoElement.textContent.includes('TO THE MOON')
    
    // If showing crypto symbol, apply glitch effects to it
    if (isShowingCrypto) {
      this.applyCryptoGlitchEffects()
      return
    }
    
    // Original logo glitch effects (now with 25% chance for logo glitches)
    const glitchType = Math.random()
    
    if (glitchType < 0.25) {
      // Logo glitch effects (25% chance)
      this.applyLogoGlitchEffects()
      
    } else if (glitchType < 0.35) {
      // Text corruption glitch
      this.logoElement.classList.add('text-corrupt')
      setTimeout(() => {
        this.logoElement.classList.remove('text-corrupt')
      }, 200 + Math.random() * 300)
      
    } else if (glitchType < 0.45) {
      // Character substitution glitch
      const originalText = this.logoElement.textContent
      const lines = originalText.split('\n')
      const randomLineIndex = Math.floor(Math.random() * lines.length)
      
      if (lines[randomLineIndex] && lines[randomLineIndex].trim()) {
        const glitchChars = '▓▒░█▄▀▐▌'
        let glitchedLine = ''
        
        for (let char of lines[randomLineIndex]) {
          if (char !== ' ' && Math.random() < 0.15) {
            glitchedLine += glitchChars[Math.floor(Math.random() * glitchChars.length)]
          } else {
            glitchedLine += char
          }
        }
        
        lines[randomLineIndex] = glitchedLine
        this.logoElement.textContent = lines.join('\n')
        
        // Restore after delay
        setTimeout(() => {
          this.logoElement.textContent = originalText
        }, 150 + Math.random() * 200)
      }
      
    } else if (glitchType < 0.55) {
      // Screen tear effect
      this.logoElement.classList.add('screen-tear')
      setTimeout(() => {
        this.logoElement.classList.remove('screen-tear')
      }, 800 + Math.random() * 400)
      
    } else if (glitchType < 0.97) {
      // Missing section effect - increased to 47% chance
      this.logoElement.classList.add('missing-section')
      setTimeout(() => {
        this.logoElement.classList.remove('missing-section')
      }, 1200 + Math.random() * 600)
      
    } else if (glitchType < 0.995) {
      // Displaced section effect - very rare at 2.5% chance
      this.logoElement.classList.add('displaced-section')
      setTimeout(() => {
        this.logoElement.classList.remove('displaced-section')
      }, 600 + Math.random() * 300)
      
    } else {
      // Full glitch effect (less frequent) - NO SOUND for random glitches
      this.glitchEffect(false)
    }
  }
  
  // Apply glitch effects specifically to the BerryBot logo
  applyLogoGlitchEffects() {
    if (!this.logoElement) return
    
    const originalText = this.logoElement.textContent
    const glitchType = Math.random()
    
    if (glitchType < 0.3) {
      // Add corruption and color shift
      this.logoElement.classList.add('text-corrupt')
      this.logoElement.style.color = ['#ff0040', '#00ffff', '#ffff00'][Math.floor(Math.random() * 3)]
      
      setTimeout(() => {
        this.logoElement.classList.remove('text-corrupt')
        this.logoElement.style.color = ''
      }, 300 + Math.random() * 200)
      
    } else if (glitchType < 0.6) {
      // Character corruption with visual effects
      let corruptedText = ''
      const glitchChars = '▓▒░█▄▀▐▌│┤┐└┴┬├─┼'
      
      for (let char of originalText) {
        if (char === '█' && Math.random() < 0.1) {
          corruptedText += glitchChars[Math.floor(Math.random() * glitchChars.length)]
        } else if (char === '╗' || char === '╔' || char === '╝' || char === '╚') {
          if (Math.random() < 0.15) {
            corruptedText += glitchChars[Math.floor(Math.random() * glitchChars.length)]
          } else {
            corruptedText += char
          }
        } else {
          corruptedText += char
        }
      }
      
      this.logoElement.textContent = corruptedText
      this.logoElement.classList.add('screen-tear')
      this.logoElement.style.color = '#ff0040'
      
      setTimeout(() => {
        this.logoElement.textContent = originalText
        this.logoElement.classList.remove('screen-tear')
        this.logoElement.style.color = ''
      }, 400 + Math.random() * 300)
      
    } else {
      // Missing sections effect
      this.logoElement.classList.add('missing-section', 'displaced-section')
      this.logoElement.style.color = '#00ffff'
      
      setTimeout(() => {
        this.logoElement.classList.remove('missing-section', 'displaced-section')
        this.logoElement.style.color = ''
      }, 600 + Math.random() * 400)
    }
  }
  
  // Apply glitch effects to cryptocurrency symbols
  applyCryptoGlitchEffects() {
    if (!this.logoElement) return
    
    const originalText = this.logoElement.textContent
    const originalColor = this.logoElement.style.color
    
    // Apply various glitch effects to crypto symbols
    const glitchType = Math.random()
    
    if (glitchType < 0.4) {
      // Corruption with color shift
      this.logoElement.classList.add('text-corrupt')
      this.logoElement.style.color = ['#ff0040', '#00ff00', '#0040ff'][Math.floor(Math.random() * 3)]
      
      setTimeout(() => {
        this.logoElement.classList.remove('text-corrupt')
        this.logoElement.style.color = originalColor
      }, 200 + Math.random() * 200)
      
    } else if (glitchType < 0.7) {
      // Screen tear effect
      this.logoElement.classList.add('screen-tear')
      
      setTimeout(() => {
        this.logoElement.classList.remove('screen-tear')
      }, 300 + Math.random() * 200)
      
    } else {
      // Missing sections
      this.logoElement.classList.add('missing-section')
      
      setTimeout(() => {
        this.logoElement.classList.remove('missing-section')
      }, 400 + Math.random() * 300)
    }
  }
  
  // Special smiley face glitch that replaces the logo temporarily
  async triggerSmileGlitch() {
    if (!this.logoElement) return
    
    console.log('Triggering smiley face glitch!')
    
    const originalText = this.logoElement.textContent
    const originalColor = this.logoElement.style.color
    
    // Add intense glitch effects
    this.logoElement.classList.add('glitch', 'text-corrupt')
    
    // First phase: Corrupt the original logo
    await this.delay(200)
    
    // Gradually corrupt the text more
    for (let corruption = 0; corruption < 3; corruption++) {
      let corruptedText = ''
      const glitchChars = '▓▒░█▄▀▐▌│┤┐└┴┬├─┼#@$%^&*!?'
      
      for (let char of originalText) {
        if (char !== ' ' && char !== '\n' && Math.random() < 0.3 + (corruption * 0.2)) {
          corruptedText += glitchChars[Math.floor(Math.random() * glitchChars.length)]
        } else {
          corruptedText += char
        }
      }
      
      this.logoElement.textContent = corruptedText
      this.logoElement.style.color = ['#ff0040', '#00ffff', '#ffff00', '#ff4000'][Math.floor(Math.random() * 4)]
      
      await this.delay(150)
    }
    
    // Clear the logo briefly
    this.logoElement.textContent = ''
    await this.delay(100)
    
    // Randomly choose between cryptocurrency symbols (removed Polkadot and Cardano)
    const cryptoSymbols = [this.bitcoinSymbol, this.ethereumSymbol, this.rocketSymbol]
    const cryptoColors = ['#f7931a', '#627eea', '#ff6b35'] // Bitcoin orange, Ethereum blue, Rocket orange
    
    const randomIndex = Math.floor(Math.random() * cryptoSymbols.length)
    const selectedSymbol = cryptoSymbols[randomIndex]
    const symbolColor = cryptoColors[randomIndex]
    
    // Show the selected cryptocurrency symbol with glitch effects
    this.logoElement.textContent = selectedSymbol
    this.logoElement.style.color = symbolColor
    this.logoElement.classList.add('screen-tear')
    
    // Flash between different corrupted versions of the symbol
    for (let flash = 0; flash < 4; flash++) {
      await this.delay(200)
      
      // Corrupt the symbol
      let corruptedSymbol = ''
      const glitchChars = '▓▒░█'
      
      for (let char of selectedSymbol) {
        if (char === '█' && Math.random() < 0.3) {
          corruptedSymbol += glitchChars[Math.floor(Math.random() * glitchChars.length)]
        } else {
          corruptedSymbol += char
        }
      }
      
      this.logoElement.textContent = corruptedSymbol
      this.logoElement.style.color = ['#ff0040', '#00ff00', '#0040ff'][Math.floor(Math.random() * 3)]
      
      await this.delay(100)
      
      // Restore clean symbol
      this.logoElement.textContent = selectedSymbol
      this.logoElement.style.color = symbolColor
    }
    
    // Hold the smile for a moment
    await this.delay(800)
    
    // Glitch transition back to original
    this.logoElement.classList.remove('screen-tear')
    this.logoElement.classList.add('displaced-section')
    
    for (let i = 0; i < 3; i++) {
      this.logoElement.textContent = ''
      await this.delay(50)
      this.logoElement.textContent = selectedSymbol
      await this.delay(50)
    }
    
    // Final corruption phase back to logo
    this.logoElement.textContent = ''
    await this.delay(100)
    
    // Restore original logo with glitch effects
    this.logoElement.textContent = originalText
    this.logoElement.style.color = '#00ffff'
    
    await this.delay(300)
    
    // Clean up effects
    this.logoElement.classList.remove('glitch', 'text-corrupt', 'displaced-section')
    this.logoElement.style.color = originalColor
    
    console.log('Smiley face glitch completed!')
  }
  
  createDivider(type = 'heavy', length = 68) {
    const char = {
      heavy: '═',
      light: '─',
      double: '▓',
      dots: '·'
    }[type] || '═'
    
    return char.repeat(length)
  }
  
  createProgressBar(percentage, length = 30) {
    const filled = Math.floor((percentage / 100) * length)
    const empty = length - filled
    return '█'.repeat(filled) + '░'.repeat(empty)
  }
  
  createStatusLine(label, status, value = '') {
    const icon = this.statusIcons[status] || '[?]'
    const color = {
      online: 'var(--terminal-green)',
      warning: 'var(--text-secondary)',
      error: 'var(--terminal-red)',
      processing: 'var(--text-accent)',
      ready: 'var(--terminal-green)'
    }[status] || 'var(--text-primary)'
    
    return `${icon} ${label}${value ? ': ' + value : ''}`
  }
  
  createArchitectureDiagram() {
    return `
 ┌─────────────────────────────────────────────────────────────┐
 │                    BERRYBOT MK3 ARCHITECTURE                │
 ├─────────────────────────────────────────────────────────────┤
 │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
 │  │   LLM #1    │    │   LLM #2    │    │   LLM #3    │     │
 │  │ OpenAI GPT  │    │ Anthropic   │    │   Google    │     │
 │  └─────────────┘    └─────────────┘    └─────────────┘     │
 │           │                 │                 │             │
 │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
 │  │   LLM #4    │    │   LLM #5    │    │   LLM #6    │     │
 │  │   Custom    │    │    Local    │    │   Ollama    │     │
 │  └─────────────┘    └─────────────┘    └─────────────┘     │
 │           │                 │                 │             │
 │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
 │  │   LLM #7    │    │   LLM #8    │    │   LLM #9    │     │
 │  │  Gemma3:27B │    │  Claude-3   │    │ Custom API  │     │
 │  └─────────────┘    └─────────────┘    └─────────────┘     │
 │                              │                              │
 │                    ┌─────────────────┐                     │
 │                    │  CONSENSUS      │                     │
 │                    │  VOTING ENGINE  │                     │
 │                    └─────────────────┘                     │
 │                              │                              │
 │                    ┌─────────────────┐                     │
 │                    │  RISK MANAGER   │                     │
 │                    └─────────────────┘                     │
 │                              │                              │
 │                    ┌─────────────────┐                     │
 │                    │ TRADE EXECUTOR  │                     │
 │                    └─────────────────┘                     │
 └─────────────────────────────────────────────────────────────┘`
  }
  
  createVotingVisualization(votes) {
    let visualization = 'RECENT VOTING RESULTS\n'
    visualization += this.createDivider('heavy') + '\n'
    
    votes.forEach((vote, index) => {
      const icon = vote.decision === 'BUY' ? '↗' : vote.decision === 'SELL' ? '↘' : '→'
      const prefix = index === votes.length - 1 ? '└─' : '├─'
      visualization += `${prefix} ${vote.model}: ${icon} ${vote.decision} (${vote.confidence}% confidence)\n`
    })
    
    return visualization
  }
  
  createSystemSpecsTable() {
    return `
┌─────────────────┬──────────────────┬─────────────────────────┐
│    Option       │    Complexity    │        Features         │
├─────────────────┼──────────────────┼─────────────────────────┤
│ Cloud VPS       │     Medium       │ 24/7 uptime, scalable  │
│ Raspberry Pi    │      Easy        │ Low power, affordable   │
│ Local Machine   │      Easy        │ Full control, testing   │
│ Docker          │     Medium       │ Portable, isolated     │
│ Kubernetes      │      Hard        │ Enterprise, redundant   │
└─────────────────┴──────────────────┴─────────────────────────┘`
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Export individual ASCII art pieces for use elsewhere
export const asciiElements = {
  dividers: {
    heavy: '═'.repeat(68),
    light: '─'.repeat(68),
    double: '▓'.repeat(68),
    dots: '·'.repeat(68)
  },
  
  status: {
    online: '[✓]',
    warning: '[!]',
    error: '[✗]',
    processing: '[~]',
    ready: '[>]'
  },
  
  progress: {
    full: (length = 30) => '█'.repeat(length),
    empty: (length = 30) => '░'.repeat(length),
    partial: (percentage, length = 30) => {
      const filled = Math.floor((percentage / 100) * length)
      return '█'.repeat(filled) + '░'.repeat(length - filled)
    }
  }
}