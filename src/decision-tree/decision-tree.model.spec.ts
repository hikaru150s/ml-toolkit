import { describe, it, expect } from '@jest/globals';
import { DecisionTreeModel } from './decision-tree.model';

describe('DecisionTreeModel', () => {
  const dataset = [
    { outlook: 'sunny', temperature: 'hot', humidity: 'high', windy: 'false', play: 'no' },
    { outlook: 'sunny', temperature: 'hot', humidity: 'high', windy: 'true', play: 'no' },
    { outlook: 'overcast', temperature: 'hot', humidity: 'high', windy: 'false', play: 'yes' },
    { outlook: 'rainy', temperature: 'mild', humidity: 'high', windy: 'false', play: 'yes' },
    { outlook: 'rainy', temperature: 'cool', humidity: 'normal', windy: 'false', play: 'yes' },
    { outlook: 'rainy', temperature: 'cool', humidity: 'normal', windy: 'true', play: 'no' },
    { outlook: 'overcast', temperature: 'cool', humidity: 'normal', windy: 'true', play: 'yes' },
    { outlook: 'sunny', temperature: 'mild', humidity: 'high', windy: 'false', play: 'no' },
    { outlook: 'sunny', temperature: 'cool', humidity: 'normal', windy: 'false', play: 'yes' },
    { outlook: 'rainy', temperature: 'mild', humidity: 'normal', windy: 'false', play: 'yes' },
    { outlook: 'sunny', temperature: 'mild', humidity: 'normal', windy: 'true', play: 'yes' },
    { outlook: 'overcast', temperature: 'mild', humidity: 'high', windy: 'true', play: 'yes' },
    { outlook: 'overcast', temperature: 'hot', humidity: 'normal', windy: 'false', play: 'yes' },
    { outlook: 'rainy', temperature: 'mild', humidity: 'high', windy: 'true', play: 'no' },
  ];
  const attributes = ['outlook', 'temperature', 'humidity', 'windy'];
  const targetAttribute = 'play';
  const model = new DecisionTreeModel(dataset, targetAttribute, attributes);

  it('should build tree', () => {
    model.buildTree();
    expect(model.isBuilt).toEqual(true);
  });

  it('should predict', () => {
    const testPoint = {
      outlook: 'sunny',
      temperature: 'cool',
      humidity: 'high',
      windy: 'true',
    };
    const prediction = model.predict(testPoint);
    expect(prediction).toEqual('yes');
  });
});
