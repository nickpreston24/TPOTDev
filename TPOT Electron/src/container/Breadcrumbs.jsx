import React, { Fragment, Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { compose } from 'recompose'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import { Typography } from '@material-ui/core';
import { faEnvelopeOpen, faHdd, faPaperPlane, faSave, faTrashAlt, } from '@fortawesome/free-regular-svg-icons';
import { faGlasses, faSlidersH, faCaretDown, faHamburger, faGripHorizontal, faBars, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Slider } from 'react-burgers';
import { BrowserRouter, Link, Route, Switch, withRouter, } from 'react-router-dom';
import List from '@material-ui/core/List';
import NoSsr from '@material-ui/core/NoSsr';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MemoryRouter from 'react-router/MemoryRouter';
import { Link as RouterLink } from 'react-router-dom';

const capitalize = string => {
	return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

const styles = theme => ({
	root: {
		marginLeft: 15,
		// zIndex: 9999,
		// position: 'fixed',
		// top: 0,
		// left: 0,
		// color: 'red !important',
		// fontSize: 8,
		// padding: '10px 30px',
		'& ol': {
			flexWrap: 'nowrap',
		},
	},
	burger: {
		paddingTop: '20px !important',
		paddingLeft: '0px !important',
		'& .BurgerBox div, div:before, div:after': {
			background: theme.palette.text.primary,
		}
	},
	typography: {
		color: theme.palette.text.primary,
		fontWeight: 400,
		// padding: '10px 10px',
	},
	chip: {
		// backgroundColor: theme.palette.grey[100],
		height: 24,
		padding: 4,
		color: theme.palette.text.secondary,
		fontWeight: theme.typography.fontWeightRegular,
		background: 'transparent',
		'&:hover, &:focus': {
			backgroundColor: `rgba(119, 119, 119, 0.1)`,
		},
		'&.active': {
			backgroundColor: `rgba(119, 119, 119, 0.1)`,
			// boxShadow: theme.shadows[1],
			//   backgroundColor: emphasize(theme.palette.grey[300], 0.12),
		},
	},
});

@inject('store')
@withStyles(styles)
@withRouter
@observer
export class RoutedBreadCrumbs extends Component {

	@observable burgerActive = false

	@action toggleBurger = () => {
		this.burgerActive = !this.burgerActive
	}

	@action navigate = (first) => {
		first && this.toggleBurger()
	}

	render() {
		const { store, classes, location, match, theme } = this.props;
		const { toggleBurger, burgerActive, navigate } = this
		let app = capitalize(match.params.app || 'Dashboard')
		let action = capitalize(match.params.action || 'Publish')
		const pathnames = location.pathname.split('/').filter(x => x)
		console.log(location, match)
		return (
			<Breadcrumbs
				className={classes.root}
				maxItems={3}
			// separator={<span style={{fontSize: 16}}>{'//'}</span>}
			>
				{pathnames.map((value, index) => {
					const first = index === 0
					const to = `/${pathnames.slice(0, index + 1).join('/')}`;
					const label = `${capitalize(pathnames[index])}`
					const last = index === pathnames.length - 1;
					console.log(first, to, last, label)

					return (
						<Link
							onClick={() => navigate(first)}
							to={to}
							key={to}
							style={{textDecoration: 'none'}}
						>
							<Chip component="a"
								// onClick={toggleBurger}
								className={classNames(classes.chip, (last && !first) && 'active')}
								label={
									<Fragment>
										{first && (
											<Slider
												width={20}
												lineHeight={3}
												lineSpacing={3}
												borderRadius={4}
												className={classes.burger}
												active={burgerActive}
											/>
										)}
										<Typography
											noWrap
											variant={first ? 'h6' : null}
											className={classes.typography}
										>
											{label}
										</Typography>
									</Fragment>
								}
								icon={!first && <FontAwesomeIcon icon={faPaperPlane} style={{ margin: 5 }} size="1x" />}
								deleteIcon={<FontAwesomeIcon icon={faCaretDown} style={{ margin: 5 }} size="lg" />}
								onDelete={() => { console.log('menu') }}
							/>
						</Link>
					)

					// return last ? (
					// 	<Typography color="textPrimary" key={to}>
					// 		{breadcrumbNameMap[to]}
					// 	</Typography>
					// ) : (
					// 		<Link component={RouterLink} color="inherit" to={to} key={to}>
					// 			{breadcrumbNameMap[to]}
					// 		</Link>
					// 	);
				})}
				{/* <Chip component="a"
					onClick={toggleBurger}
					className={classNames(classes.chip, 'active')}
					label={
						<Fragment>
							<Slider width={20} lineHeight={3} lineSpacing={3} borderRadius={4}
								className={classes.burger}
								active={burgerActive}
							/>
							<Typography variant="h6" className={classes.typography} noWrap >{app}</Typography>
						</Fragment>
					}
					deleteIcon={<FontAwesomeIcon icon={faCaretDown} style={{margin: 5}} size="lg" />}
					onDelete={() => { console.log('menu') }}
				/>
				<Chip component="a"
					className={classNames(classes.chip, 'active')}
					label={<Typography className={classes.typography} noWrap >{action}</Typography>}
					icon={<FontAwesomeIcon icon={faPaperPlane} style={{margin: 5}} size="1x" />}
				/> */}
			</Breadcrumbs>
		)
	}
}