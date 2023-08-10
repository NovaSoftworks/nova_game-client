import { InputUtils } from '..'

// Mock the window event listeners
let keyDownEventListener: ((event: KeyboardEvent) => void) | null = null
let keyUpEventListener: ((event: KeyboardEvent) => void) | null = null
let blurEventListener: ((event: FocusEvent) => void) | null = null

const addEventListenerMock = jest.spyOn(window, 'addEventListener')
addEventListenerMock.mockImplementation((event: string, listener: EventListenerOrEventListenerObject) => {
    if (event === 'keydown') {
        keyDownEventListener = listener as (event: KeyboardEvent) => void
    } else if (event === 'keyup') {
        keyUpEventListener = listener as (event: KeyboardEvent) => void
    } else if (event === 'blur') {
        blurEventListener = listener as (event: FocusEvent) => void
    }
})

describe('Input', () => {
    // Initialize Input before each test
    beforeEach(() => {
        keyDownEventListener = null
        keyUpEventListener = null
        InputUtils.initialize()
    })

    // Tests for keydown and keyup event listeners
    describe('keydown, keyup and blur event listeners', () => {
        it('should update keyState to true on keydown event', () => {
            keyDownEventListener?.({ key: 'Enter' } as KeyboardEvent)
            expect(InputUtils.keyState['Enter']).toBe(true)
        })

        it('should update keyState to false on keyup event', () => {
            keyUpEventListener?.({ key: 'Escape' } as KeyboardEvent)
            expect(InputUtils.keyState['Escape']).toBe(false)
        })

        it('should reset keyState when the window loses focus', () => {
            blurEventListener?.({} as FocusEvent)
            expect(InputUtils.keyState).toEqual({})
        })
    })

    // Tests for Input.getKeyDown()
    describe('getKeyDown', () => {
        it('should return true for keys that are currently down', () => {
            InputUtils.keyState['ArrowUp'] = true
            expect(InputUtils.getKeyDown('ArrowUp')).toBe(true)

            InputUtils.keyState['ArrowDown'] = false
            expect(InputUtils.getKeyDown('ArrowDown')).toBe(false)
        })
    })

    // Tests for Input.getKeyUp()
    describe('getKeyUp', () => {
        it('should return true for keys that are currently up', () => {
            InputUtils.keyState['ArrowLeft'] = false
            expect(InputUtils.getKeyUp('ArrowLeft')).toBe(true)

            InputUtils.keyState['ArrowRight'] = true
            expect(InputUtils.getKeyUp('ArrowRight')).toBe(false)
        })

        it('should return true for keys that are released after being down', () => {
            InputUtils.keyState['Space'] = true
            expect(InputUtils.getKeyUp('Space')).toBe(false)

            InputUtils.keyState['Space'] = false
            expect(InputUtils.getKeyUp('Space')).toBe(true)
        })
    })
})