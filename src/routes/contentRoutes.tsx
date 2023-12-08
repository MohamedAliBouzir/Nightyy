import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import {
	dashboardPagesMenu,
	demoPagesMenu,
	MigrationPageMenu,
} from '../menu';
import Login from '../pages/presentation/auth/Login';

const HOME = {
	HOME: lazy(() => import('../pages/presentation/HomePage')),
	// LAUNCH_MIGRATION: lazy(() => import('../pages/presentation/migration/MigrationStarterPage')),
	LAUNCH_MIGRATION: lazy(() => import('../pages/presentation/migration/Migpage')),
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/DashboardPage')),
};
const MIGRATION = {
	MIGRATION_VIEW: lazy(() => import('../pages/presentation/migration/MigrationViewPage')),
	REALTIME: lazy(() => import('../pages/presentation/migration/RealTimeMigPage')),
};

const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};

// const CONTENT = {
// 	CONTENTS: lazy(() => import('../pages/documentation/content/ContentListPage')),
// 	TYPOGRAPHY: lazy(() => import('../pages/documentation/content/TypographyPage')),
// 	IMAGES: lazy(() => import('../pages/documentation/content/ImagesPage')),
// 	TABLES: lazy(() => import('../pages/documentation/content/TablesPage')),
// 	FIGURES: lazy(() => import('../pages/documentation/content/FiguresPage')),
// };
// const FORMS_PAGE = {
// 	FORMS: lazy(() => import('../pages/documentation/forms/FormsListPage')),
// 	FORM_GROUP: lazy(() => import('../pages/documentation/forms/FormGroupPage')),
// 	FORM_CONTROLS: lazy(() => import('../pages/documentation/forms/FormControlsPage')),
// 	SELECT: lazy(() => import('../pages/documentation/forms/SelectPage')),
// 	CHECKS_AND_RADIO: lazy(() => import('../pages/documentation/forms/ChecksAndRadioPage')),
// 	RANGE: lazy(() => import('../pages/documentation/forms/RangePage')),
// 	INPUT_GROUP: lazy(() => import('../pages/documentation/forms/InputGroupPage')),
// 	VALIDATION: lazy(() => import('../pages/documentation/forms/ValidationPage')),
// 	WIZARD: lazy(() => import('../pages/documentation/forms/WizardPage')),
// };
// const GETTING_STARTED = {
// 	INSTALLATION: lazy(() => import('../pages/documentation/getting-started/InstallationPage')),
// 	DEVELOPMENT: lazy(() => import('../pages/documentation/getting-started/DevelopmentPage')),
// 	FOLDER: lazy(() => import('../pages/documentation/getting-started/FolderStructurePage')),
// 	BOOTSTRAP: lazy(() => import('../pages/documentation/getting-started/BootstrapVariablesPage')),
// 	PROJECT: lazy(() => import('../pages/documentation/getting-started/ProjectStructurePage')),
// };
// const ROUTES = {
// 	ROUTER: lazy(() => import('../pages/documentation/routes/RouterPage')),
// };
// const COMPONENTS_PAGE = {
// 	COMPONENTS: lazy(() => import('../pages/documentation/components/ComponentsListPage')),
// 	ACCORDION: lazy(() => import('../pages/documentation/components/AccordionPage')),
// 	ALERT: lazy(() => import('../pages/documentation/components/AlertPage')),
// 	BADGE: lazy(() => import('../pages/documentation/components/BadgePage')),
// 	BREADCRUMB: lazy(() => import('../pages/documentation/components/BreadcrumbPage')),
// 	BUTTON: lazy(() => import('../pages/documentation/components/ButtonPage')),
// 	BUTTON_GROUP: lazy(() => import('../pages/documentation/components/ButtonGroupPage')),
// 	CARD: lazy(() => import('../pages/documentation/components/CardPage')),
// 	CAROUSEL: lazy(() => import('../pages/documentation/components/CarouselPage')),
// 	COLLAPSE: lazy(() => import('../pages/documentation/components/CollapsePage')),
// 	DROPDOWN: lazy(() => import('../pages/documentation/components/DropdownsPage')),
// 	LIST_GROUP: lazy(() => import('../pages/documentation/components/ListGroupPage')),
// 	MODAL: lazy(() => import('../pages/documentation/components/ModalPage')),
// 	NAVS_TABS: lazy(() => import('../pages/documentation/components/NavsTabsPage')),
// 	OFF_CANVAS: lazy(() => import('../pages/documentation/components/OffCanvasPage')),
// 	PAGINATION: lazy(() => import('../pages/documentation/components/PaginationPage')),
// 	POPOVERS: lazy(() => import('../pages/documentation/components/PopoversPage')),
// 	PROGRESS: lazy(() => import('../pages/documentation/components/ProgressPage')),
// 	SCROLLSPY: lazy(() => import('../pages/documentation/components/ScrollspyPage')),
// 	SPINNER: lazy(() => import('../pages/documentation/components/SpinnersPage')),
// 	TABLE: lazy(() => import('../pages/documentation/components/TablePage')),
// 	TOASTS: lazy(() => import('../pages/documentation/components/ToastsPage')),
// 	TOOLTIP: lazy(() => import('../pages/documentation/components/TooltipPage')),
// };
// const UTILITIES = {
// 	UTILITIES: lazy(() => import('../pages/documentation/utilities/UtilitiesListPage')),
// 	API: lazy(() => import('../pages/documentation/utilities/ApiPage')),
// 	BACKGROUND: lazy(() => import('../pages/documentation/utilities/BackgroundPage')),
// 	BORDERS: lazy(() => import('../pages/documentation/utilities/BordersPage')),
// 	COLORS: lazy(() => import('../pages/documentation/utilities/ColorsPage')),
// 	DISPLAY: lazy(() => import('../pages/documentation/utilities/DisplayPage')),
// 	FLEX: lazy(() => import('../pages/documentation/utilities/FlexPage')),
// 	FLOAT: lazy(() => import('../pages/documentation/utilities/FloatPage')),
// 	INTERACTIONS: lazy(() => import('../pages/documentation/utilities/InteractionsPage')),
// 	OVERFLOW: lazy(() => import('../pages/documentation/utilities/OverflowPage')),
// 	POSITION: lazy(() => import('../pages/documentation/utilities/PositionPage')),
// 	SHADOWS: lazy(() => import('../pages/documentation/utilities/ShadowsPage')),
// 	SIZING: lazy(() => import('../pages/documentation/utilities/SizingPage')),
// 	SPACING: lazy(() => import('../pages/documentation/utilities/SpacingPage')),
// 	TEXT: lazy(() => import('../pages/documentation/utilities/TextPage')),
// 	VERTICAL_ALIGN: lazy(() => import('../pages/documentation/utilities/VerticalAlignPage')),
// 	VISIBILITY: lazy(() => import('../pages/documentation/utilities/VisibilityPage')),
// };
// const ICONS = {
// 	ICONS_LIST: lazy(() => import('../pages/documentation/icons/IconsListPage')),
// 	ICON: lazy(() => import('../pages/documentation/icons/IconPage')),
// 	MATERIAL: lazy(() => import('../pages/documentation/icons/MaterialPage')),
// };
// const CHARTS_PAGE = {
// 	CHART_LIST: lazy(() => import('../pages/documentation/charts/ChartsListPage')),
// 	GENERAL_USAGE: lazy(() => import('../pages/documentation/charts/ChartGeneralUsagePage')),
// 	SPARKLINE: lazy(() => import('../pages/documentation/charts/ChartSparklinePage')),
// 	LINE: lazy(() => import('../pages/documentation/charts/ChartLinePage')),
// 	AREA: lazy(() => import('../pages/documentation/charts/ChartAreaPage')),
// 	COLUMN: lazy(() => import('../pages/documentation/charts/ChartColumnPage')),
// 	BAR: lazy(() => import('../pages/documentation/charts/ChartBarPage')),
// 	MIXED: lazy(() => import('../pages/documentation/charts/ChartMixedPage')),
// 	TIMELINE: lazy(() => import('../pages/documentation/charts/ChartTimelinePage')),
// 	CANDLESTICK: lazy(() => import('../pages/documentation/charts/ChartCandlestickPage')),
// 	BOX_WHISKER: lazy(() => import('../pages/documentation/charts/ChartBoxWhiskerPage')),
// 	PIE_DONUT: lazy(() => import('../pages/documentation/charts/ChartPieDonutPage')),
// 	RADAR: lazy(() => import('../pages/documentation/charts/ChartRadarPage')),
// 	POLAR: lazy(() => import('../pages/documentation/charts/ChartPolarPage')),
// 	RADIAL_BAR: lazy(() => import('../pages/documentation/charts/ChartRadialBarPage')),
// 	BUBBLE: lazy(() => import('../pages/documentation/charts/ChartBubblePage')),
// 	SCATTER: lazy(() => import('../pages/documentation/charts/ChartScatterPage')),
// 	HEAT_MAP: lazy(() => import('../pages/documentation/charts/ChartHeatMapPage')),
// 	TREE_MAP: lazy(() => import('../pages/documentation/charts/ChartTreeMapPage')),
// };
// const EXTRA = {
// 	NOTIFICATION: lazy(() => import('../pages/documentation/extras/NotificationPage')),
// 	HOOKS: lazy(() => import('../pages/documentation/extras/HooksPage')),
// };

const presentation: RouteProps[] = [
	/**
	 * Landing
	 */
	{
		path: dashboardPagesMenu.summary.path,
		element: <HOME.HOME />,
	},
	{
		path: dashboardPagesMenu.general.path,
		element: <HOME.DASHBOARD />,
	},
	/**
	 * Migration
	 */
	{
		path: dashboardPagesMenu.migrationLauncher.path,
		element: <HOME.LAUNCH_MIGRATION />
	},
	{
		path: `${MigrationPageMenu.migrationID.path}/:id`,
		element: <MIGRATION.MIGRATION_VIEW />
	},
	{
		path: dashboardPagesMenu.migrationRealTime.path,
		element: <MIGRATION.REALTIME />
	},

	/** ************************************************** */

	/**
	 * Auth Page
	 */
	{
		path: demoPagesMenu.page404.path,
		element: <AUTH.PAGE_404 />,
	},
	{
		path: demoPagesMenu.login.path,
		element: <Login />,
	},
	{
		path: demoPagesMenu.signUp.path,
		element: <Login isSignUp />,
	},

];
// const documentation: RouteProps[] = [
// 	/**
// 	 * Getting Started
// 	 */
// 	{
// 		path: gettingStartedPagesMenu.gettingStarted.subMenu.installation.path,
// 		element: <GETTING_STARTED.INSTALLATION />,
// 	},
// 	{
// 		path: gettingStartedPagesMenu.gettingStarted.subMenu.dev.path,
// 		element: <GETTING_STARTED.DEVELOPMENT />,
// 	},
// 	{
// 		path: gettingStartedPagesMenu.gettingStarted.subMenu.folderStructure.path,
// 		element: <GETTING_STARTED.FOLDER />,
// 	},
// 	{
// 		path: gettingStartedPagesMenu.gettingStarted.subMenu.bootstrapVariables.path,
// 		element: <GETTING_STARTED.BOOTSTRAP />,
// 	},
// 	{
// 		path: gettingStartedPagesMenu.gettingStarted.subMenu.projectStructure.path,
// 		element: <GETTING_STARTED.PROJECT />,
// 	},
// 	/**
// 	 * Routes
// 	 */
// 	{
// 		path: gettingStartedPagesMenu.routes.subMenu.router.path,
// 		element: <ROUTES.ROUTER />,
// 	},
// 	/**
// 	 * Bootstrap
// 	 */

// 	/**
// 	 * Content
// 	 */
// 	{
// 		path: componentPagesMenu.content.path,
// 		element: <CONTENT.CONTENTS />,
// 	},
// 	{
// 		path: componentPagesMenu.content.subMenu.typography.path,
// 		element: <CONTENT.TYPOGRAPHY />,
// 	},
// 	{
// 		path: componentPagesMenu.content.subMenu.images.path,
// 		element: <CONTENT.IMAGES />,
// 	},
// 	{
// 		path: componentPagesMenu.content.subMenu.tables.path,
// 		element: <CONTENT.TABLES />,
// 	},
// 	{
// 		path: componentPagesMenu.content.subMenu.figures.path,
// 		element: <CONTENT.FIGURES />,
// 	},

// 	/**
// 	 * Forms
// 	 */
// 	{
// 		path: componentPagesMenu.forms.path,
// 		element: <FORMS_PAGE.FORMS />,
// 	},
// 	{
// 		path: componentPagesMenu.forms.subMenu.formGroup.path,
// 		element: <FORMS_PAGE.FORM_GROUP />,
// 	},
// 	{
// 		path: componentPagesMenu.forms.subMenu.formControl.path,
// 		element: <FORMS_PAGE.FORM_CONTROLS />,
// 	},
// 	{
// 		path: componentPagesMenu.forms.subMenu.select.path,
// 		element: <FORMS_PAGE.SELECT />,
// 	},
// 	{
// 		path: componentPagesMenu.forms.subMenu.checksAndRadio.path,
// 		element: <FORMS_PAGE.CHECKS_AND_RADIO />,
// 	},
// 	{
// 		path: componentPagesMenu.forms.subMenu.range.path,
// 		element: <FORMS_PAGE.RANGE />,
// 	},
// 	{
// 		path: componentPagesMenu.forms.subMenu.inputGroup.path,
// 		element: <FORMS_PAGE.INPUT_GROUP />,
// 	},
// 	{
// 		path: componentPagesMenu.forms.subMenu.validation.path,
// 		element: <FORMS_PAGE.VALIDATION />,
// 	},
// 	{
// 		path: componentPagesMenu.forms.subMenu.wizard.path,
// 		element: <FORMS_PAGE.WIZARD />,
// 	},

// 	/**
// 	 * Components
// 	 */
// 	{
// 		path: componentPagesMenu.components.path,
// 		element: <COMPONENTS_PAGE.COMPONENTS />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.tooltip.path,
// 		element: <COMPONENTS_PAGE.TOOLTIP />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.toasts.path,
// 		element: <COMPONENTS_PAGE.TOASTS />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.scrollspy.path,
// 		element: <COMPONENTS_PAGE.SCROLLSPY />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.carousel.path,
// 		element: <COMPONENTS_PAGE.CAROUSEL />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.spinners.path,
// 		element: <COMPONENTS_PAGE.SPINNER />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.listGroup.path,
// 		element: <COMPONENTS_PAGE.LIST_GROUP />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.breadcrumb.path,
// 		element: <COMPONENTS_PAGE.BREADCRUMB />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.collapse.path,
// 		element: <COMPONENTS_PAGE.COLLAPSE />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.pagination.path,
// 		element: <COMPONENTS_PAGE.PAGINATION />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.progress.path,
// 		element: <COMPONENTS_PAGE.PROGRESS />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.card.path,
// 		element: <COMPONENTS_PAGE.CARD />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.button.path,
// 		element: <COMPONENTS_PAGE.BUTTON />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.buttonGroup.path,
// 		element: <COMPONENTS_PAGE.BUTTON_GROUP />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.alert.path,
// 		element: <COMPONENTS_PAGE.ALERT />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.badge.path,
// 		element: <COMPONENTS_PAGE.BADGE />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.popovers.path,
// 		element: <COMPONENTS_PAGE.POPOVERS />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.dropdowns.path,
// 		element: <COMPONENTS_PAGE.DROPDOWN />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.accordion.path,
// 		element: <COMPONENTS_PAGE.ACCORDION />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.modal.path,
// 		element: <COMPONENTS_PAGE.MODAL />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.navsTabs.path,
// 		element: <COMPONENTS_PAGE.NAVS_TABS />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.offcanvas.path,
// 		element: <COMPONENTS_PAGE.OFF_CANVAS />,
// 	},
// 	{
// 		path: componentPagesMenu.components.subMenu.table.path,
// 		element: <COMPONENTS_PAGE.TABLE />,
// 	},

// 	/**
// 	 * Utilities
// 	 */
// 	{
// 		path: componentPagesMenu.utilities.path,
// 		element: <UTILITIES.UTILITIES />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.api.path,
// 		element: <UTILITIES.API />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.background.path,
// 		element: <UTILITIES.BACKGROUND />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.borders.path,
// 		element: <UTILITIES.BORDERS />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.colors.path,
// 		element: <UTILITIES.COLORS />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.display.path,
// 		element: <UTILITIES.DISPLAY />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.flex.path,
// 		element: <UTILITIES.FLEX />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.float.path,
// 		element: <UTILITIES.FLOAT />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.interactions.path,
// 		element: <UTILITIES.INTERACTIONS />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.overflow.path,
// 		element: <UTILITIES.OVERFLOW />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.position.path,
// 		element: <UTILITIES.POSITION />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.shadows.path,
// 		element: <UTILITIES.SHADOWS />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.sizing.path,
// 		element: <UTILITIES.SIZING />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.spacing.path,
// 		element: <UTILITIES.SPACING />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.text.path,
// 		element: <UTILITIES.TEXT />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.verticalAlign.path,
// 		element: <UTILITIES.VERTICAL_ALIGN />,
// 	},
// 	{
// 		path: componentPagesMenu.utilities.subMenu.visibility.path,
// 		element: <UTILITIES.VISIBILITY />,
// 	},

// 	/**
// 	 * Extra
// 	 */

// 	/**
// 	 * Icons
// 	 */
// 	{
// 		path: componentPagesMenu.icons.path,
// 		element: <ICONS.ICONS_LIST />,
// 	},
// 	{
// 		path: componentPagesMenu.icons.subMenu.icon.path,
// 		element: <ICONS.ICON />,
// 	},
// 	{
// 		path: componentPagesMenu.icons.subMenu.material.path,
// 		element: <ICONS.MATERIAL />,
// 	},

// 	/**
// 	 * Charts
// 	 */
// 	{
// 		path: componentPagesMenu.charts.path,
// 		element: <CHARTS_PAGE.CHART_LIST />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsUsage.path,
// 		element: <CHARTS_PAGE.GENERAL_USAGE />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsSparkline.path,
// 		element: <CHARTS_PAGE.SPARKLINE />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsLine.path,
// 		element: <CHARTS_PAGE.LINE />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsArea.path,
// 		element: <CHARTS_PAGE.AREA />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsColumn.path,
// 		element: <CHARTS_PAGE.COLUMN />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsBar.path,
// 		element: <CHARTS_PAGE.BAR />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsMixed.path,
// 		element: <CHARTS_PAGE.MIXED />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsTimeline.path,
// 		element: <CHARTS_PAGE.TIMELINE />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsCandleStick.path,
// 		element: <CHARTS_PAGE.CANDLESTICK />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsBoxWhisker.path,
// 		element: <CHARTS_PAGE.BOX_WHISKER />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsPieDonut.path,
// 		element: <CHARTS_PAGE.PIE_DONUT />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsRadar.path,
// 		element: <CHARTS_PAGE.RADAR />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsPolar.path,
// 		element: <CHARTS_PAGE.POLAR />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsRadialBar.path,
// 		element: <CHARTS_PAGE.RADIAL_BAR />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsBubble.path,
// 		element: <CHARTS_PAGE.BUBBLE />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsScatter.path,
// 		element: <CHARTS_PAGE.SCATTER />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsHeatMap.path,
// 		element: <CHARTS_PAGE.HEAT_MAP />,
// 	},
// 	{
// 		path: componentPagesMenu.charts.subMenu.chartsTreeMap.path,
// 		element: <CHARTS_PAGE.TREE_MAP />,
// 	},

// 	{
// 		path: componentPagesMenu.notification.path,
// 		element: <EXTRA.NOTIFICATION />,
// 	},
// 	{
// 		path: componentPagesMenu.hooks.path,
// 		element: <EXTRA.HOOKS />,
// 	},
// ];
const contents = [...presentation];

export default contents;