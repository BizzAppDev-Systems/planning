odoo.define("dynamic_gantt.GanttRow", function (require) {
    "use strict";

    /* eslint no-unused-vars: ["error", { "args": "none" }]*/

    var GanttRow = require("web_gantt.GanttRow");

    var PlanningGanttRow = GanttRow.include({
        _calculateMarginAndWidth: function () {
            /* Inherit the _calculateMarginAndWidth method to calculate the margin and
            width for the pill*/
            var self = this;
            var left = false;
            var diff = false;
            var gapSize = 0;
            this.pills.forEach(function (pill) {
                switch (self.state.scale) {
                    // Calculate the margin and width for the pill for dynamic
                    case "dynamic":
                        left = pill.startDate.diff(
                            pill.startDate.clone().startOf("day"),
                            "hours"
                        );
                        pill.leftMargin = (left / 24) * 100;
                        diff = pill.stopDate.diff(pill.startDate, "hours");
                        /* If difference is less than 24 hrs set 24 as difference for
                        width calculation */
                        if (diff < 24) {
                            diff = 24;
                        }
                        // Eventually compensate border(s) width
                        gapSize = pill.stopDate.diff(pill.startDate, "days") - 1;
                        pill.width =
                            gapSize > 0
                                ? "calc(" + (diff / 24) * 100 + "% + " + gapSize + "px)"
                                : (diff / 24) * 100 + "%";
                        break;
                    default:
                        break;
                }
            });
            this._super();
        },
    });

    return PlanningGanttRow;
});
