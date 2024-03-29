/* eslint-disable func-names, prefer-arrow-callback */

import { SimpleSchema } from '../src/SimpleSchema.js'
import expectErrorLength from './helpers/expectErrorLength.js'
import expectErrorOfTypeLength from './helpers/expectErrorOfTypeLength.js'
import friendsSchema from './helpers/friendsSchema.js'
import testSchema from './helpers/testSchema.js'

describe('SimpleSchema - max', function () {
  describe('normal', function () {
    it('string', function () {
      expectErrorLength(testSchema, {
        minMaxString: 'nottoolongnottoolong'
      }).toEqual(0)

      expectErrorLength(testSchema, {
        minMaxString: 'toolongtoolongtoolong'
      }).toEqual(1)

      expectErrorLength(testSchema, {
        minMaxStringArray: ['nottoolongnottoolong', 'nottoolongnottoolong']
      }).toEqual(0)

      expectErrorLength(testSchema, {
        minMaxStringArray: ['toolongtoolongtoolong', 'toolongtoolongtoolong']
      }).toEqual(2)

      expectErrorLength(testSchema, {
        minMaxStringArray: ['nottoolongnottoolong', 'nottoolongnottoolong', 'nottoolongnottoolong']
      }).toEqual(1)
    })

    it('number', function () {
      expectErrorLength(testSchema, {
        minMaxNumber: 20
      }).toEqual(0)

      expectErrorLength(testSchema, {
        minMaxNumber: 21
      }).toEqual(1)

      expectErrorLength(testSchema, {
        minMaxNumberCalculated: 20
      }).toEqual(0)

      expectErrorLength(testSchema, {
        minMaxNumberCalculated: 21
      }).toEqual(1)
    })

    it('date', function () {
      expectErrorLength(testSchema, {
        minMaxDate: (new Date(Date.UTC(2013, 11, 31)))
      }).toEqual(0)

      expectErrorLength(testSchema, {
        minMaxDate: (new Date(Date.UTC(2014, 0, 1)))
      }).toEqual(1)

      expectErrorLength(testSchema, {
        minMaxDateCalculated: (new Date(Date.UTC(2013, 11, 31)))
      }).toEqual(0)

      expectErrorLength(testSchema, {
        minMaxDateCalculated: (new Date(Date.UTC(2014, 0, 1)))
      }).toEqual(1)
    })
  })

  describe('modifier with $setOnInsert', function () {
    it('string', function () {
      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxString: 'nottoolongnottoolong'
        }
      }, { modifier: true, upsert: true }).toEqual(0)

      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxString: 'toolongtoolongtoolong'
        }
      }, { modifier: true, upsert: true }).toEqual(1)

      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxStringArray: ['nottoolongnottoolong', 'nottoolongnottoolong']
        }
      }, { modifier: true, upsert: true }).toEqual(0)

      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxStringArray: ['toolongtoolongtoolong', 'toolongtoolongtoolong']
        }
      }, { modifier: true, upsert: true }).toEqual(2)

      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxStringArray: ['nottoolongnottoolong', 'nottoolongnottoolong', 'nottoolongnottoolong']
        }
      }, { modifier: true, upsert: true }).toEqual(1)
    })

    it('number', function () {
      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxNumber: 20
        }
      }, { modifier: true, upsert: true }).toEqual(0)

      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxNumber: 21
        }
      }, { modifier: true, upsert: true }).toEqual(1)

      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxNumberCalculated: 20
        }
      }, { modifier: true, upsert: true }).toEqual(0)

      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxNumberCalculated: 21
        }
      }, { modifier: true, upsert: true }).toEqual(1)
    })

    it('date', function () {
      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxDate: (new Date(Date.UTC(2013, 11, 31)))
        }
      }, { modifier: true, upsert: true }).toEqual(0)

      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxDate: (new Date(Date.UTC(2014, 0, 1)))
        }
      }, { modifier: true, upsert: true }).toEqual(1)

      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxDateCalculated: (new Date(Date.UTC(2013, 11, 31)))
        }
      }, { modifier: true, upsert: true }).toEqual(0)

      expectErrorLength(testSchema, {
        $setOnInsert: {
          minMaxDateCalculated: (new Date(Date.UTC(2014, 0, 1)))
        }
      }, { modifier: true, upsert: true }).toEqual(1)
    })
  })

  describe('modifier with $set or $inc', function () {
    it('string', function () {
      expectErrorLength(testSchema, {
        $set: {
          minMaxString: 'nottoolongnottoolong'
        }
      }, { modifier: true }).toEqual(0)

      expectErrorLength(testSchema, {
        $set: {
          minMaxString: 'toolongtoolongtoolong'
        }
      }, { modifier: true }).toEqual(1)

      expectErrorLength(testSchema, {
        $set: {
          minMaxStringArray: ['nottoolongnottoolong', 'nottoolongnottoolong']
        }
      }, { modifier: true }).toEqual(0)

      expectErrorLength(testSchema, {
        $set: {
          minMaxStringArray: ['toolongtoolongtoolong', 'toolongtoolongtoolong']
        }
      }, { modifier: true }).toEqual(2)

      expectErrorLength(testSchema, {
        $set: {
          minMaxStringArray: ['nottoolongnottoolong', 'nottoolongnottoolong', 'nottoolongnottoolong']
        }
      }, { modifier: true }).toEqual(1)
    })

    it('number', function () {
      expectErrorLength(testSchema, {
        $set: {
          minMaxNumber: 20
        }
      }, { modifier: true }).toEqual(0)

      expectErrorLength(testSchema, {
        $set: {
          minMaxNumber: 21
        }
      }, { modifier: true }).toEqual(1)

      expectErrorLength(testSchema, {
        $set: {
          minMaxNumberCalculated: 20
        }
      }, { modifier: true }).toEqual(0)

      expectErrorLength(testSchema, {
        $set: {
          minMaxNumberCalculated: 21
        }
      }, { modifier: true }).toEqual(1)

      expectErrorLength(testSchema, {
        $set: {
          maxZero: 1
        }
      }, { modifier: true }).toEqual(1)

      // Should not be invalid because we don't know what we're starting from
      expectErrorLength(testSchema, {
        $inc: {
          maxZero: 5
        }
      }, { modifier: true }).toEqual(0)
    })

    it('date', function () {
      expectErrorLength(testSchema, {
        $set: {
          minMaxDate: (new Date(Date.UTC(2013, 11, 31)))
        }
      }, { modifier: true }).toEqual(0)

      expectErrorLength(testSchema, {
        $set: {
          minMaxDate: (new Date(Date.UTC(2014, 0, 1)))
        }
      }, { modifier: true }).toEqual(1)

      expectErrorLength(testSchema, {
        $set: {
          minMaxDateCalculated: (new Date(Date.UTC(2013, 11, 31)))
        }
      }, { modifier: true }).toEqual(0)

      expectErrorLength(testSchema, {
        $set: {
          minMaxDateCalculated: (new Date(Date.UTC(2014, 0, 1)))
        }
      }, { modifier: true }).toEqual(1)
    })
  })

  describe('modifier with $push', function () {
    it('valid', function () {
      expectErrorOfTypeLength(SimpleSchema.ErrorTypes.MAX_STRING, friendsSchema, {
        $push: {
          friends: {
            name: 'Bob',
            type: 'best'
          }
        }
      }, { modifier: true }).toEqual(0)
    })

    it('invalid', function () {
      expectErrorOfTypeLength(SimpleSchema.ErrorTypes.MAX_STRING, friendsSchema, {
        $push: {
          friends: {
            name: 'Bobby',
            type: 'best'
          }
        }
      }, { modifier: true }).toEqual(1)
    })
  })

  describe('modifier with $push and $each', function () {
    it('valid', function () {
      expectErrorOfTypeLength(SimpleSchema.ErrorTypes.MAX_STRING, friendsSchema, {
        $push: {
          friends: {
            $each: [{
              name: 'Bob',
              type: 'best'
            }, {
              name: 'Bob',
              type: 'best'
            }]
          }
        }
      }, { modifier: true }).toEqual(0)
    })

    it('invalid', function () {
      expectErrorOfTypeLength(SimpleSchema.ErrorTypes.MAX_STRING, friendsSchema, {
        $push: {
          friends: {
            $each: [{
              name: 'Bob',
              type: 'best'
            }, {
              name: 'Bobby',
              type: 'best'
            }]
          }
        }
      }, { modifier: true }).toEqual(1)
    })
  })

  describe('modifier with $addToSet', function () {
    it('valid', function () {
      expectErrorOfTypeLength(SimpleSchema.ErrorTypes.MAX_STRING, friendsSchema, {
        $addToSet: {
          friends: {
            name: 'Bob',
            type: 'best'
          }
        }
      }, { modifier: true }).toEqual(0)
    })

    it('invalid', function () {
      expectErrorOfTypeLength(SimpleSchema.ErrorTypes.MAX_STRING, friendsSchema, {
        $addToSet: {
          friends: {
            name: 'Bobby',
            type: 'best'
          }
        }
      }, { modifier: true }).toEqual(1)
    })
  })

  describe('modifier with $addToSet and $each', function () {
    it('valid', function () {
      expectErrorOfTypeLength(SimpleSchema.ErrorTypes.MAX_STRING, friendsSchema, {
        $addToSet: {
          friends: {
            $each: [{
              name: 'Bob',
              type: 'best'
            }, {
              name: 'Bob',
              type: 'best'
            }]
          }
        }
      }, { modifier: true }).toEqual(0)
    })

    it('invalid', function () {
      expectErrorOfTypeLength(SimpleSchema.ErrorTypes.MAX_STRING, friendsSchema, {
        $addToSet: {
          friends: {
            $each: [{
              name: 'Bob',
              type: 'best'
            }, {
              name: 'Bobby',
              type: 'best'
            }]
          }
        }
      }, { modifier: true }).toEqual(1)
    })
  })
})
