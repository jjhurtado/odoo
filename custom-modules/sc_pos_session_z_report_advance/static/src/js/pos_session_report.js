/** @odoo-module */

import { usePos } from "@point_of_sale/app/store/pos_hook";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class PosCustomRepButton extends Component {
    static template = "sc_pos_session_z_report_advance.PosCustomRepButton";

    setup() {
        this.pos = usePos();
        this.report = useService("report");
    }

    async printZReport() {
        var self = this;
        var pos_session_id = self.pos.pos_session.id;

        await this.report.doAction("sc_pos_session_z_report_advance.action_report_session_z", [
            pos_session_id,
        ]);
    }

}

ProductScreen.addControlButton({
    component: PosCustomRepButton,
    condition: function () {
        return true;
    },
});


// odoo.define('sc_pos_session_z_report_advance', function (require) {
//     "use strict";

//     const PosComponent = require('point_of_sale.PosComponent');
//     const ProductScreen = require('point_of_sale.ProductScreen');
//     const { useListener } = require("@web/core/utils/hooks");
//     const Registries = require('point_of_sale.Registries');

//     class PosCustomRepButton extends PosComponent {
//         setup() {
//             super.setup();
//             useListener('click', this.onClick);
//         }
//         async onClick() {
//             var self = this.env;
//             var pos_session_id = self.pos.pos_session.id;
//             this.env.legacyActionManager.do_action(
//                 'sc_pos_session_z_report_advance.action_report_session_z', {
//                 additional_context: {active_ids: [pos_session_id]},
//             });
//         }
//     }
//     PosCustomRepButton.template = 'PosCustomRepButton';

//     ProductScreen.addControlButton({
//         component: PosCustomRepButton,
//     });

//     Registries.Component.add(PosCustomRepButton);

//     return PosCustomRepButton;


// });
