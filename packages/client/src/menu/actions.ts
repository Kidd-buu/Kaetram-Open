import Menu from './menu';

import _ from 'lodash-es';

import type { Modules } from '@kaetram/common/network';
import type { Bonuses, Stats } from '@kaetram/common/types/item';

export interface MenuAction {
    action: Modules.MenuActions;
    alt?: boolean;
}

export default class Actions extends Menu {
    // Contains the list of actions.
    private list: HTMLUListElement = document.querySelector('#action-container > ul')!;

    // Info about the current action.
    private name: HTMLElement = document.querySelector('#action-container > .action-item-name')!;
    private description: HTMLElement = document.querySelector(
        '#action-container > .action-item-description'
    )!;

    private buttonCallback?: (menuAction: MenuAction) => void;

    public constructor() {
        super('#action-container');
    }

    /**
     * Opens the action menu with a specified array of actions. We first clear
     * all the previous actions and load the new ones in.
     * @param actions Array of actions to append to our list prior to displaying.
     * @param name The name of the item that the actions are being performed on.
     * @param attackStats The attack stats of the item.
     * @param defenseStats The defense stats of the item.
     * @param bonuses The bonuses of the item.
     */

    public override show(
        actions: MenuAction[],
        name: string,
        attackStats: Stats,
        defenseStats: Stats,
        bonuses: Bonuses,
        itemDescription = ''
    ): void {
        this.clear();

        _.each(actions, (action: MenuAction) => this.add(action));

        // Update the name of the selected item.
        this.name.innerHTML = name;

        let description =
            itemDescription ||
            `<u>Attack Stats:</u>&emsp;&emsp;<u>Defense Stats:</u> <br>
            Crush: ${attackStats.crush}&emsp;&emsp;&emsp;&emsp;Crush: ${defenseStats.crush} <br>
            Slash: ${attackStats.slash}&emsp;&emsp;&emsp;&emsp;Slash: ${defenseStats.slash} <br>
            Stab: ${attackStats.stab}&emsp;&emsp;&emsp;&emsp;&ensp;Stab: ${defenseStats.stab} <br>
            Magic: ${attackStats.magic}&emsp;&emsp;&emsp;&emsp;Magic: ${defenseStats.magic} <br>
            <u>Bonuses</u>: <br>
            Accuracy: ${bonuses.accuracy} <br>
            Strength: ${bonuses.strength} <br>
            Archery: ${bonuses.archery} <br>
            Magic: ${bonuses.magic} <br>`;

        this.description.innerHTML = description;

        super.show();
    }

    /**
     * Appends an action element to the list of actions.
     * @param menuAction Enumeration containing the string text of the action.
     */

    public override add(menuAction: MenuAction): void {
        let { action, alt } = menuAction,
            element = document.querySelector(`.action-${action}`);

        if (!element) {
            element = document.createElement('li');

            // Set the type of action to the button element
            element.classList.add('action-button', `action-${action}`);

            this.list.append(element);
        }

        // Assign an action when the element is clicked.
        element.addEventListener(alt ? 'contextmenu' : 'click', (e) => {
            e.preventDefault();

            this.buttonCallback?.(menuAction);
        });
    }

    /**
     * Removes all the `div` action elements from the list.
     */

    private clear(): void {
        this.list.innerHTML = '';
    }

    /**
     * Callback handler for when an action button has been pressed.
     * @param callback Contains the action that was pressed.
     */

    public onButton(callback: (menuAction: MenuAction) => void): void {
        this.buttonCallback = callback;
    }
}
