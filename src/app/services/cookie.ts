
export function getHasReadFromCookie() {
  var boolean = localStorage.getItem("hasRead")
  
  if (boolean = "true") {
    return true
  }
  //boolean)
  return false
}

export function getHasAdminFromCookie() {
  var boolean = localStorage.getItem("hasSuperPermission")
  //boolean)
  if (boolean = "true") {
    return true
  }

  return false
}


export function getHasWriteFromCookie() {
  var boolean = localStorage.getItem("hasWrite")
  //boolean)
  if (boolean="true") {
    return true
  }
  //boolean)
  return false
}

export function getHasDeleteFromCookie() {
  var boolean = localStorage.getItem("hasDelete")
  
  if (boolean = "true") {
    return true
  }
  //boolean)
  return false
}
