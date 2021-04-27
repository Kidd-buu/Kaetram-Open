import Entity from '../entity';

export default class Chest extends Entity {
    public readonly type = 'chest';

    public constructor(id: string, kind: string) {
        super(id, kind);
    }

    public idle(): void {
        this.setAnimation('idle_down', 150);
    }
}
