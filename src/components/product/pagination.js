import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
	pagination: PropTypes.object.isRequired,
	onPageChange: PropTypes.func,
};
Pagination.defaultProps ={
	onPageChange: null,
};

function Pagination ( props) {

	const { pagination, onPageChange } = props;
	const {totalPage, offset} = pagination;

	function handlePageChange(newPage) {
		if(onPageChange){
			onPageChange(newPage);
		}
		
	}

	return (
		<div>
			<button disabled = {offset <= 1}
			onClick = {() => handlePageChange(offset-1)}
			>Prev</button>

			<button disabled = {offset >= totalPage}
			onClick = {() => handlePageChange(offset+1)}
			>Next</button>
		</div>
		
		);
}
export default Pagination;