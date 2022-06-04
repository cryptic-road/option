// *****************************************************************************
// * Copyright 2022-present Impetigo Tycoon <impetigotycoon@proton.me>         *
// *                                                                           *
// * Licensed under the Apache License, Version 2.0 (the "License");           *
// * you may not use this file except in compliance with the License.          *
// * You may obtain a copy of the License at                                   *
// *                                                                           *
// *     http://www.apache.org/licenses/LICENSE-2.0                            *
// *                                                                           *
// * Unless required by applicable law or agreed to in writing, software       *
// * distributed under the License is distributed on an "AS IS" BASIS,         *
// * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
// * See the License for the specific language governing permissions and       *
// * limitations under the License.                                            *
// *****************************************************************************

import { ok as assertOk } from 'assert'

type OptionMethodAndThenTransformerT< ValueT,
                                      SecondaryValueT > =
  (value: ValueT)
    => (Option< SecondaryValueT > |
        Option< never >)

type OptionMethodFilterPredicateT< ValueT > =
  (value: ValueT)
    => boolean

type OptionMethodGetValueOrElseDefaultValueProducerT< ValueT > =
  ()
    => ValueT

type OptionMethodMapMapperT< ValueT,
                             ReturnValueT > =
  (value: ValueT)
    => ReturnValueT

type OptionMethodMapOrElseDefaultValueProducerT< ReturnValueT > =
  ()
    => ReturnValueT

type OptionMethodMapOrElseMapperT< ValueT,
                                   ReturnValueT > =
  (value: ValueT)
    => ReturnValueT

type OptionMethodMapOrMapperT< ValueT,
                               ReturnValueT > =
  (value: ValueT)
    => ReturnValueT

type OptionMethodOrElseOtherOptionProducerT< ValueT > =
  ()
    => (Option< ValueT > |
        Option< never >)

abstract class Option< ValueT >
{
  public abstract get hasNone():
    boolean

  public abstract get hasSome():
    boolean

  public abstract get value():
    (ValueT |
     never)

  protected constructor()
  {}

  public *[ Symbol.iterator ]():
    Generator< ValueT,
               void,
               void >
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return
    }

    assertOk(this.hasSome === true)

    yield this.value
  }

  public $()
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      throw new ReferenceError('Option has no value')
    }

    assertOk(this.hasSome === true)

    return this as Option< ValueT >
  }

  public and< SecondaryValueT >(secondaryOption: Option< SecondaryValueT >):
    (Option< ValueT > |
     Option< SecondaryValueT >)
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return this as Option< ValueT > as Option< never >
    }

    assertOk(this.hasSome === true)

    return secondaryOption
  }

  public andThen< SecondaryValueT >(transformer: OptionMethodAndThenTransformerT< ValueT,
                                                                                  SecondaryValueT >):
    (Option< ValueT > |
     Option< SecondaryValueT >)
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return this as Option< ValueT > as Option< never >
    }

    assertOk(this.hasSome === true)

    return transformer(this.value)
  }

  public filter(predicate: OptionMethodFilterPredicateT< ValueT >):
    (Option< ValueT > |
     Option< never >)
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return this as Option< ValueT > as Option< never >
    }

    assertOk(this.hasSome === true)

    return predicate(this.value) ?
      this as Option< ValueT > :
      none
  }

  public flatten():
    (Option< ValueT > |
     Option< never >)
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return this as Option< ValueT > as Option< never >
    }

    assertOk(this.hasSome === true)

    if (! (this.value instanceof Option))
    {
      return this as Option< ValueT >
    }

    if (this.value.hasNone)
    {
      assertOk(this.value.hasSome === false)

      return this.value as Option< ValueT > as Option< never >
    }

    assertOk(this.value.hasSome === true)

    return this.value as Option< ValueT >
  }

  public getValueOr(defaultValue: ValueT)
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return defaultValue
    }

    assertOk(this.hasSome === true)

    return this.value
  }

  public getValueOrElse(defaultValueProducer: OptionMethodGetValueOrElseDefaultValueProducerT< ValueT >)
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return defaultValueProducer()
    }

    assertOk(this.hasSome === true)

    return this.value
  }

  public map< ReturnValueT >(mapper: OptionMethodMapMapperT< ValueT,
                                                             ReturnValueT >):
    (Option< ValueT > |
     Option< ReturnValueT >)
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return this as Option< ValueT > as Option< never >
    }

    assertOk(this.hasSome === true)

    const newValue = mapper(this.value)

    return some(newValue)
  }

  public mapOr< ReturnValueT >(mapper: OptionMethodMapOrMapperT< ValueT,
                                                                 ReturnValueT >,
                               defaultValue: ReturnValueT)
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return defaultValue
    }

    assertOk(this.hasSome === true)

    return mapper(this.value)
  }

  public mapOrElse< ReturnValueT >(mapper: OptionMethodMapOrElseMapperT< ValueT,
                                                                         ReturnValueT >,
                                   defaultValueProducer: OptionMethodMapOrElseDefaultValueProducerT< ReturnValueT >)
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return defaultValueProducer()
    }

    assertOk(this.hasSome === true)

    return mapper(this.value)
  }

  public or(otherOption: (Option< ValueT > |
                          Option< never >)):
    (Option< ValueT > |
     Option< never >)
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return otherOption
    }

    assertOk(this.hasSome === true)

    return this as Option< ValueT >
  }

  public orElse(otherOptionProducer: OptionMethodOrElseOtherOptionProducerT< ValueT >):
    (Option< ValueT > |
     Option< never >)
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return otherOptionProducer()
    }

    assertOk(this.hasSome === true)

    return this as Option< ValueT >
  }

  public toJSON()
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return null
    }

    assertOk(this.hasSome === true)

    return this.value
  }

  public valueOf()
  {
    return this.value
  }

  public xor(otherOption: (Option< ValueT > |
                           Option< never >)):
    (Option< ValueT > |
     Option< never >)
  {
    if (this.hasSome)
    {
      assertOk(this.hasNone === false)

      return this as Option< ValueT >
    }

    assertOk(this.hasNone === true)

    if (otherOption.hasSome)
    {
      assertOk(otherOption.hasNone === false)

      return otherOption
    }

    assertOk(otherOption.hasNone === true)

    return none
  }

  public zip< OtherValueT >(otherOption: Option< OtherValueT >):
    (Option< [
       ValueT,
       OtherValueT,
     ] > |
      Option< never >)
  {
    if (this.hasNone)
    {
      assertOk(this.hasSome === false)

      return this as Option< ValueT > as Option< never >
    }

    assertOk(this.hasSome === true)

    if (otherOption.hasNone)
    {
      assertOk(otherOption.hasSome === false)

      return otherOption as Option< OtherValueT > as Option< never >
    }

    assertOk(otherOption.hasSome === true)

    return some([
      this.value,
      otherOption.value,
    ] as [
      ValueT,
      OtherValueT,
    ])
  }
}

Object.seal(Option)

class None
  extends Option< never >
{
  public get hasNone()
  {
    return this._hasNone()
  }

  public get hasSome()
  {
    return this._hasSome()
  }

  public get value()
  {
    return this._getValue()
  }

  public constructor()
  {
    super()

    Object.freeze(this)
  }

  private _getValue():
    never
  {
    throw new ReferenceError('Option has some value')
  }

  private _hasNone()
  {
    return true as true
  }

  private _hasSome()
  {
    return false as false
  }
}

Object.seal(None)

class Some< ValueT >
  extends Option< ValueT >
{
  private _value: ValueT

  public get hasNone()
  {
    return this._hasNone()
  }

  public get hasSome()
  {
    return this._hasSome()
  }

  public get value()
  {
    return this._getValue()
  }

  public constructor(value: ValueT)
  {
    super()

    this._value = value

    Object.defineProperties(this, {
      _value: { enumerable: false },
    })

    Object.freeze(this)
  }

  private _getValue()
  {
    return this._value
  }

  private _hasNone()
  {
    return false as false
  }

  private _hasSome()
  {
    return true as true
  }
}

Object.seal(Some)

const none = (() => {
  const none = new None()

  return none as Option< never >
})()

function some< ValueT >(value: ValueT)
{
  const some = new Some(value)

  return some as Option< ValueT >
}

export {
  type Option as default,

  type None,
  none,
  type Some,
  some,
}
