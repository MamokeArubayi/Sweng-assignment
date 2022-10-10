import * as CalculatorController from '../controllers/calculator';

export class CalculatorRoute {
    public routes(app): void {
        app.route('/calculator').get(CalculatorController.calculate);
    }
}