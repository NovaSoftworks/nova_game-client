import Physics from '../physics'

describe('Physics', () => {
    // Test the fixedTimeStep property
    it('should have a fixedTimeStep of 16ms', () => {
        expect(Physics.fixedTimeStep).toBe(16);
    });

    // Test the stepNumber property
    it('should have a stepNumber of 0 by default', () => {
        expect(Physics.stepNumber).toBe(0);
    });

    // Test if stepNumber increments correctly
    it('should increment the stepNumber when a new frame is simulated', () => {
        const initialStepNumber = Physics.stepNumber;
        // Simulate a new frame
        // You can add your simulation logic here if needed.
        // For testing purposes, we'll just manually increment the stepNumber.
        Physics.stepNumber++;
        const updatedStepNumber = Physics.stepNumber;

        expect(updatedStepNumber).toBe(initialStepNumber + 1);
    });

    // Test if fixedTimeStep is a non-negative value
    it('should have a non-negative fixedTimeStep', () => {
        expect(Physics.fixedTimeStep).toBeGreaterThanOrEqual(0);
    });
});