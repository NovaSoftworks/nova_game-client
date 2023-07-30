import { Input } from '../'

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
        Input.initialize()
    })

    // Tests for keydown and keyup event listeners
    describe('keydown, keyup and blur event listeners', () => {
        it('should update keyState to true on keydown event', () => {
            keyDownEventListener?.({ key: 'Enter' } as KeyboardEvent)
            expect(Input.keyState['Enter']).toBe(true)
        })

        it('should update keyState to false on keyup event', () => {
            keyUpEventListener?.({ key: 'Escape' } as KeyboardEvent)
            expect(Input.keyState['Escape']).toBe(false)
        })

        it('should reset keyState when the window loses focus', () => {
            blurEventListener?.({} as FocusEvent)
            expect(Input.keyState).toEqual({})
        })
    })

    // Tests for Input.getKeyDown()
    describe('getKeyDown', () => {
        it('should return true for keys that are currently down', () => {
            Input.keyState['ArrowUp'] = true
            expect(Input.getKeyDown('ArrowUp')).toBe(true)

            Input.keyState['ArrowDown'] = false
            expect(Input.getKeyDown('ArrowDown')).toBe(false)
        })
    })

    // Tests for Input.getKeyUp()
    describe('getKeyUp', () => {
        it('should return true for keys that are currently up', () => {
            Input.keyState['ArrowLeft'] = false
            expect(Input.getKeyUp('ArrowLeft')).toBe(true)

            Input.keyState['ArrowRight'] = true
            expect(Input.getKeyUp('ArrowRight')).toBe(false)
        })

        it('should return true for keys that are released after being down', () => {
            Input.keyState['Space'] = true
            expect(Input.getKeyUp('Space')).toBe(false)

            Input.keyState['Space'] = false
            expect(Input.getKeyUp('Space')).toBe(true)
        })
    })
})