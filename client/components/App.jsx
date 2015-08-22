// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from './Layout'

// Since it's a small app, let's just have one connect() and one set of reducers.
function mapStateToProps(state) {
	return state
}

export default connect(mapStateToProps)(Layout)
