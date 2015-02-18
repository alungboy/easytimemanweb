"use strict";
angular.module('Fbase', ['app', 'firebase'])

// Basic
.factory('Fbase', ['FBURL',
    function(FBURL, $firebaseAuth) {
        var RefFactory = new Firebase(FBURL);
        return RefFactory;
    }
])

// Autentikasi
.factory('FbAuth', ['Fbase', '$firebaseAuth',
    function(Fbase, $firebaseAuth) {
        var auth = $firebaseAuth(Fbase);
        return auth;
    }
])

// Users
.service("UserObj", ['Fbase', 'FbAuth', "$firebase", function(Fbase, FbAuth, $firebase) {

    var getObj = function() {
        var user = FbAuth.$getAuth();
        if (user) {
            return $firebase(Fbase.child('users').child(user.uid)).$asObject();
        }
        return null;
    };

    return getObj;
}])

.factory("UserRef", ['Fbase', 'FbAuth', "$firebase", function(Fbase, FbAuth, $firebase) {
    var objRef = null

    var getRef = function() {
        if (!objRef) {
            var user = FbAuth.$getAuth();
            if (user) {
                objRef = $firebase(Fbase.child('users').child(user.uid));
            }

        }
        return objRef;
    };

    return getRef;
}])

// LIST UNIT (DIPAKE HAMPIR SEMUA MENU)
.service("UserCompaniesObj", ['Fbase', 'FbAuth', "$firebase", function(Fbase, FbAuth, $firebase) {

    var getObj = function() {
        var user = FbAuth.$getAuth();
        if (user) {
            var sync = $firebase(Fbase.child('users').child(user.uid).child('companies'));
            return sync.$asObject();
        }
        return null;

    };
    return getObj;
}])

.service("UserCompaniesRef", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getRef = function() {
        var user = FbAuth.$getAuth();
        if (user) {
            var objRef = $firebase(Fbase.child('users').child(user.uid).child('companies'));

            return objRef;
        }
        return null
    };

    return getRef;
}])

// First Setting 
.service("UsersRegRef", ['Fbase', "$firebase", "FbAuth", function(Fbase, $firebase, FbAuth) {
    var getRef = function() {
        var user = FbAuth.$getAuth();
        if (user) {
            var ref = $firebase(Fbase.child('users-reg').child(user.uid));
            return ref;
        }
        return null;
    };

    return getRef;
}])

.service("UsersRegDetailObj", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var getObj = function() {
        var user = FbAuth.$getAuth();
        if (user) {
            var ref = $firebase(Fbase.child('users-reg').child(user.uid));
            return ref;
        }
        return null;
    };

    return getObj;
}])

// REKAP HARIAN , REKAP BULANAN, REKAP PEGAWAI
// belum dibuat

// KEHADIRAN
.service("AttsCompanyObj", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var getObj = function(compId, pageStart, pageSize) {

        if (!pageStart) {
            pageStart = 0;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('atts').child(compId).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asObject();
    };

    return getObj;
}])

// DAFTAR PEGAWAI
.service("EmpsCompanyRef", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getObj = function(compId) {

        var sync = $firebase(Fbase.child('emps').child(compId));
        return sync;
    };

    return getObj;
}])

.service("EmpsCompanyObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getObj = function(compId, pageStart, pageSize) {

        if (!pageStart) {
            pageStart = 0;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('emps').child(compId).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asObject();
    };

    return getObj;
}])

.service("EmpsCompanyArr", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(compId, pageStart, pageSize) {

        if (!pageStart) {
            pageStart = 0;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('emps').child(compId).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asArray();
    };

    return get;
}])

.service("EmpsCompanyDetailObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getObj = function(compId, pin) {
        var sync = $firebase(Fbase.child('emps').child(compId).child(pin));
        return sync.$asObject();
    };

    return getObj;
}])

// SIDIK PEGAWAI
.service("FingersCompanyRef", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var getObj = function(compId, pageStart, pageSize) {

        if (!pageStart) {
            pageStart = 0;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        var sync = $firebase(Fbase.child('fingers').child(compId));
        return sync;
    };

    return getObj;
}])

.service("FingersCompanyObj", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var getObj = function(compId, pageStart, pageSize) {

        if (!pageStart) {
            pageStart = 0;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('fingers').child(compId).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asObject();
    };

    return getObj;
}])


// IJIN
// belum dibuat

// MASTER IJIN
.service("MasterExCompanyObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(compId) {
        console.log(compId);
        var sync = $firebase(Fbase.child('exceptions').child(compId));
        return sync.$asObject();
    };
    return get;
}])

// JADWAL KERJA
.service("SchesCompanyObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(compId, pageStart, pageSize) {

        if (!pageStart) {
            pageStart = 1;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('sches').child(compId).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asObject();
    };

    return get;
}])

.service("SchesCompanyArr", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(compId) {

        var sync = $firebase(Fbase.child('sches').child(compId));
        return sync.$asArray();
    };

    return get;
}])

.service("ScheCompanyDetailObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getObj = function(compId, scheId) {

        var sync = $firebase(Fbase.child('sches').child(compId).child(scheId));
        return sync.$asObject();
    };

    return getObj;
}])

// JADWAL LIBUR
// belum dibuat

// LIST DEPARTEMEN
.service("DepartementsCompanyRef", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getRef = function(compId) {
        var objRef = $firebase(Fbase.child('depts').child(compId));
        return objRef;
    };

    return getRef;
}])

.service("DepartCompanyDetailObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getObj = function(compId, deptId) {
        var sync = $firebase(Fbase.child('depts').child(compId).child(deptId));
        return sync.$asObject();
    };
    return getObj;
}])

.service("DepartCompanyObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(compId) {
        var sync = $firebase(Fbase.child('depts').child(compId));
        return sync.$asObject();
    };

    return get;
}])

.service("DepartCompanyArr", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(compId) {
        var sync = $firebase(Fbase.child('depts').child(compId));
        return sync.$asArray();
    };

    return get;
}])

.service("DepartementsMemberObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(compId, pageStart, pageSize) {

        var sync = $firebase(Fbase.child('members').child(compId));
        return sync.$asObject();
    };

    return get;
}])

// LIST UNIT
.service("CompanyRef", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getRef = function(compId) {

        return $firebase(Fbase.child('companies').child(compId));
    };

    return getRef;
}])

.service("CompanyIdCounterRef", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getRef = function(compId, idCounter) {

        return $firebase(Fbase.child('companies').child(compId).child(idCounter));
    };

    return getRef;
}])

.service("CompanyMembersRef", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getRef = function(compId) {

        return $firebase(Fbase.child('members').child(compId));
    };

    return getRef;
}])

.service("CompanyMembersDetailRef", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getRef = function(compId, uid) {

        return $firebase(Fbase.child('members').child(compId).child(uid));
    };

    return getRef;
}])


// LIST MESIN
.service("DevicesCompanyObj", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var getObj = function(compId) {


        var sync = $firebase(Fbase.child('devices').child(compId));
        return sync.$asObject();
    };

    return getObj;
}])

.service("DevicesCmdCompanyObj", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var getObj = function(compId, deviceSn, pageStart, pageSize) {

        if (!pageStart) {
            pageStart = 0;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('devices-cmd').child(compId).child(deviceSn).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asObject();
    };

    return getObj;
}])

// STATUS COMMAND MESIN
.service("CmdsCompanyRef", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getRef = function(compId) {


        var ref = $firebase(Fbase.child('cmds').child(compId));
        return ref;
    };

    return getRef;
}])

.service("CmdsCompanyDetailRef", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(compId, childKey) {


        var ref = $firebase(Fbase.child('cmds').child(compId).child(childKey));
        return ref;
    };

    return get;
}])

.service("CmdsCompanyObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var getObj = function(compId, pageStart, pageSize) {

        if (!pageStart) {
            pageStart = 1;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('cmds').child(compId).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asObject();
    };

    return getObj;
}])

.service("CmdsCompanyArr", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(compId, pageStart, pageSize) {

        if (!pageStart) {
            pageStart = 1;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('cmds').child(compId).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asArray();
    };

    return get;
}])

// DATA SIDIK MASUK
.service("FingersinCompanyObj", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var getObj = function(compId, pageStart, pageSize) {

        if (!pageStart) {
            pageStart = 1;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('fingersin').child(compId).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asObject();
    };
    return getObj;
}])

.service("FingersinCompanyArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(compId, pageStart, pageSize) {

        if (!pageStart) {
            pageStart = 1;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('fingersin').child(compId).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asArray();
    };
    return get;
}])

// DATA PEGAWAI MASUK
.service("EmpsinCompanyObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(compId, pageStart, pageSize) {
        console.log(arguments)
        if (!pageStart) {
            pageStart = 1;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('empsin').child(compId).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asObject();
    };

    return get;
}])

.service("EmpsinCompanyArr", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(compId, pageStart, pageSize) {
        console.log(arguments)
        if (!pageStart) {
            pageStart = 1;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('empsin').child(compId).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asArray();
    };

    return get;
}])

// Log Mesin?
.service("OpLogsDeviceCompanyObj", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var getObj = function(compId, pageStart, pageSize) {

        if (!pageStart) {
            pageStart = 0;
        }

        if (!pageSize) {
            pageSize = 5;
        }
        pageStart = '' + pageStart;
        var sync = $firebase(Fbase.child('oplogs-device').child(compId).orderByKey().startAt(pageStart).limitToFirst(pageSize));
        return sync.$asObject();
    };

    return getObj;
}])



;
