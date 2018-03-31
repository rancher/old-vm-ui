import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { NumberCard } from './components'

function Dashboard({ instances, loading }) {
  const instanceNum = instances.data.length
  const volumeNum = 0
  const { instances: instanceLoading } = loading.models

  const numbers = [{
    icon: 'laptop',
    color: '#64ea91',
    title: 'Instances',
    number: instanceNum,
    linkTo: '/instances',
    loading: instanceLoading,
  }, {
    icon: 'database',
    color: '#d897eb',
    title: 'Volumes',
    number: volumeNum,
    linkTo: '/volume',
  },
  ]

  const numberCards = numbers.map((item, key) => <Col key={key} lg={12} md={12}>
    <NumberCard {...item} />
  </Col>)

  return (
    <div>
      <Row gutter={24}>
        {numberCards}
      </Row>
    </div>
  )
}

Dashboard.propTypes = {
  instances: PropTypes.object,
  volume: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ instances, loading }) => ({ instances, loading }))(Dashboard)
